class_name BroadcastHandler
extends Node

signal update_match(room: Dictionary)
signal remove_match(roomId: int)

func handle_broadcast(broadcast: Broadcast) -> void:
	var payload: Variant = broadcast.payload
	
	match broadcast.action:
		"update_match":
			if payload is Dictionary:
				update_match.emit(payload)
		"remove_match":
			if payload is int:
				remove_match.emit(payload)
