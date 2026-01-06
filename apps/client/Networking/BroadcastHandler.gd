class_name BroadcastHandler
extends Node

signal match_updated(room: Room)
signal match_removed(roomId: int)

func handle_broadcast(broadcast: Broadcast) -> void:
	var payload: Variant = broadcast.payload
	
	match broadcast.action:
		"update_match":
			var data: Dictionary = payload
			var match_data := Room.new(data)
			match_updated.emit(match_data)
		"remove_match":
			match_removed.emit(payload)
