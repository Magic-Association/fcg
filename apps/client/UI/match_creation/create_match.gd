extends Button

@onready var standard: Button = $"../HBoxContainer/StandardContainer/Standard"

var selected_gamemode: StringName

func _ready() -> void:
	standard.button_group.pressed.connect(_on_gamemode_selected)
	
func _on_pressed() -> void:
	await RPCRegistry.create_match(selected_gamemode)

func _on_gamemode_selected(button: BaseButton) -> void:
	print(button)
	selected_gamemode = button.get_meta("gamemode") if button.has_meta("gamemode") else &"Custom"
	disabled = false
