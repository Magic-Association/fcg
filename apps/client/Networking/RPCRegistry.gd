class_name RPCRegistry

static func hello() -> Array[Room]:
	var res: RPCResponse = await Network.fetch_rpc("hello")
	if not res.result is Array:
		return []
	
	var rooms: Array[Room] = []
	for room_data: Dictionary in res.result:
		rooms.append(Room.new(room_data))
	return rooms
