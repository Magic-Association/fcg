@tool
extends VBoxContainer

const match_entry := preload("res://UI/match_entry.tscn")
	
func _ready() -> void:
	if Engine.is_editor_hint():
		var mock_rooms := []
		for i in 20:
			mock_rooms.append([i, {"name": "Mock Match %d" % (i + 1)}])
		display_matches(mock_rooms)
	else:
		await Network.connected_to_server
		var res: Variant = await Network.fetch_rpc("list_matches")
		@warning_ignore("unsafe_cast")
		display_matches(res.result as Array)
		
func display_matches(matches: Array) -> void:
	for room: Array in matches:
		var data: Dictionary = room[1]
		var entry := match_entry.instantiate()
		var label: Label = entry.get_node("Label")
		label.text = data.name if data.name else "No Name"
		add_child(entry)
