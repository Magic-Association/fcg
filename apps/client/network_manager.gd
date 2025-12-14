extends Node

const SERVER_URL = "ws://localhost:5026"

signal connected_to_server
signal connection_closed
signal response_received(req_id: int, message: Variant)
signal broadcast_received(req_id: int, message: Variant)


var client_id := 1
var ws := WebSocketPeer.new()
var last_state := WebSocketPeer.STATE_CLOSED
var next_req_id := 1

func _ready() -> void:
	var err := ws.connect_to_url(SERVER_URL)
	if err:
		print("Could not connect to server at ", SERVER_URL)
		set_process(false)
	print("Connecting to server at %s..." % SERVER_URL)
	
func _process(_delta: float) -> void:
	ws.poll()
	
	var state := ws.get_ready_state()
	
	if last_state != state:
		last_state = state
		if state == ws.STATE_OPEN:
			print("Connected")
			connected_to_server.emit()
		elif state == ws.STATE_CLOSED:
			var code := ws.get_close_code()
			print("WebSocket closed with code: %d. Clean: %s" % [code, code != -1])
			connection_closed.emit()
			set_process(false)
	
	while state == WebSocketPeer.STATE_OPEN and ws.get_available_packet_count():
		var message: Variant = get_message()
		if message:
			print("Received: ", message)
			var parsed: Variant = JSON.parse_string(str(message))
			if parsed.req_id:
				response_received.emit(parsed.req_id, parsed)
			else:
				broadcast_received.emit(parsed)
		
func get_message() -> Variant:
	if not ws.get_available_packet_count():
		return null
	var pkt := ws.get_packet()
	if ws.was_string_packet():
		return pkt.get_string_from_utf8()
	return bytes_to_var(pkt)

func s_binary(message: String) -> Error:
	return ws.send(var_to_bytes(message))
	
func s_string(message: String) -> Error:
	return ws.send_text(message)
	
func s_rpc(method: StringName, ...args: Array) -> int:
	var req_id := next_req_id
	next_req_id += 1
	var data := {
		"client_id": client_id,
		"req_id": req_id,
		"method": method,
		"args": args,
	}
	s_string(JSON.stringify(data))
	return req_id
	
func fetch_rpc(method: StringName, ...args: Array) -> Variant:
	var req_id: int = s_rpc.callv([method] + args)
	while true:
		var sig_args: Variant = await response_received
		var sig_req_id: int = sig_args[0]
		if sig_req_id == req_id:
			var message: Variant = sig_args[1]
			return message
	return -1
