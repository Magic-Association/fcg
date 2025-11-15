extends Button

@onready var line_edit: LineEdit = $"../LineEdit"

func _on_pressed() -> void:
	line_edit.text_submitted.emit(line_edit.text)
