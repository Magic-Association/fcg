@tool
extends VBoxContainer

const match_entry := preload("res://UI/match_entry.tscn")

var matches := []
	
func _ready() -> void:
	if Engine.is_editor_hint():
		for i in 20:
			matches.append([i, {"name": "Mock Match %d" % (i + 1)}])
		display_matches()
	else:
		matches = await RPCRegistry.hello()
		display_matches()
		
func display_matches() -> void:
	for room: Array in matches:
		var data: Dictionary = room[1]
		var entry := match_entry.instantiate()
		var label: Label = entry.get_node("Label")
		label.text = data.name if data.name else "No Name"
		add_child(entry)
