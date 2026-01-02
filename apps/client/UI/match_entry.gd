@tool
extends HBoxContainer
class_name MatchEntry

@onready var label: Label = $Label

var room_id: int
var text: String

func setup(match_data: Room) -> void:
	room_id = match_data.id
	update_data(match_data)

func update_data(new_match_data: Room) -> void:
	text = new_match_data.get("name")
	update_label()

func update_label() -> void:
	if label.text != text:
		label.text = text
