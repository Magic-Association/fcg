@tool
extends HBoxContainer
class_name MatchEntry

@onready var label: Label = $Label

var room_id: int
var text: String

func setup(i_room_id: int, i_match_data: Dictionary) -> void:
	room_id = i_room_id
	update_data(i_match_data)

func update_data(new_match_data: Dictionary) -> void:
	text = new_match_data.get("name", "No Name")
	update_label()

func update_label() -> void:
	if label.text != text:
		label.text = text
