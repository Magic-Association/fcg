extends HBoxContainer

const SPRITE_0001 = preload("res://Assets/placeholders/Sprite-0001.png")
const WHITE = preload("res://Assets/placeholders/white.png")

const EMPTY_COLOR = Color(0.302, 0.302, 0.302)
const OCCUPIED_COLOR = Color(1, 1, 1)

@onready var usernameLabel: Label = $UsernameSpacer/Username
@onready var avatar: TextureRect = $AvatarMask/Avatar

func set_player(username: String) -> void:
	usernameLabel.text = username
	usernameLabel.modulate = OCCUPIED_COLOR
	avatar.texture = SPRITE_0001
	avatar.modulate = OCCUPIED_COLOR

func clear_player() -> void:
	usernameLabel.text = "Username"
	usernameLabel.modulate = EMPTY_COLOR
	avatar.texture = WHITE
	avatar.modulate = EMPTY_COLOR
