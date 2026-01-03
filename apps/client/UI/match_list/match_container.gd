@tool
extends VBoxContainer

const MATCH_ENTRY = preload("res://UI/match_list/match_entry.tscn")

var matches: Dictionary[int, Room] = {}
var match_entries: Dictionary[int, MatchEntry] = {}
	
func _ready() -> void:
	if Engine.is_editor_hint():
		for i in 10:
			create_match_entry(Room.new({"id": i, "name": "Mock Match %d" % (i + 1)}))
	else:
		Broadcasts.update_match.connect(_on_update_match)
		Broadcasts.remove_match.connect(_on_remove_match)
	
		var match_data := await RPCRegistry.hello()
		for room: Room in match_data:
			create_match_entry(room)
	display_matches()
	
func create_match_entry(match_data: Room) -> void:
	var match_entry: MatchEntry = MATCH_ENTRY.instantiate()
	add_child(match_entry)
	move_child(match_entry, 0)
	match_entry.setup(match_data)
	match_entries[match_data.id] = match_entry
		
func display_matches() -> void:
	for room_id: int in matches.keys():
		if match_entries.has(room_id):
			match_entries[room_id].update_data(matches[room_id])
		else:
			create_match_entry(matches[room_id])
		
func _on_update_match(room: Room) -> void:
	if match_entries.has(room.id):
		var match_entry: MatchEntry = match_entries.get(room.id)
		match_entry.update_data(room)
	else:
		create_match_entry(room)
	
func _on_remove_match(roomId: int) -> void:
	if not match_entries.has(roomId):
		return
	var match_entry: MatchEntry = match_entries.get(roomId)
	match_entry.queue_free()
	
