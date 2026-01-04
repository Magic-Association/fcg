class_name BroadcastHandler
extends Node

signal update_match(room: Room)
signal remove_match(roomId: int)

func handle_broadcast(broadcast: Broadcast) -> void:
	var payload: Variant = broadcast.payload
	
	match broadcast.action:
		"update_match":
			var data: Dictionary = payload
			var match_data := Room.new(data)
			update_match.emit(match_data)
		"remove_match":
			remove_match.emit(payload)
