extends HBoxContainer

@onready var usernameLabel: Label = $UsernameSpacer/Username

func set_player(username: String) -> void:
	usernameLabel.text = username
