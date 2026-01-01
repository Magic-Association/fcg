@tool
extends VBoxContainer

const MATCH_ENTRY = preload("res://UI/match_entry.tscn")

var matches: Dictionary[int, Dictionary] = {}
var match_entries: Dictionary[int, MatchEntry] = {}
	
func _ready() -> void:
	if Engine.is_editor_hint():
		for i in 20:
			matches[i] = {"name": "Mock Match %d" % (i + 1)}
	else:
		Broadcasts.update_match.connect(_on_update_match)
		Broadcasts.remove_match.connect(_on_remove_match)
	
		var match_data: Array = await RPCRegistry.hello()
		for room: Array in match_data:
			var room_id: int = room[0]
			var room_data: Dictionary = room[1]
			matches[room_id] = room_data
	display_matches()
		
func display_matches() -> void:
	for room_id: int in matches.keys():
		if match_entries.has(room_id):
			match_entries[room_id].update_data(matches[room_id])
		else:
			var match_entry: MatchEntry = MATCH_ENTRY.instantiate()
			add_child(match_entry)
			match_entry.setup(room_id, matches[room_id])
			match_entries[room_id] = match_entry
		
func _on_update_match(room: Dictionary) -> void:
	pass
	
func _on_remove_match(roomId: int) -> void:
	pass
