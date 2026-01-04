extends HBoxContainer

@onready var usernameLabel: Label = $UsernameSpacer/Username
@onready var avatar: TextureRect = $AvatarMask/Avatar
const SPRITE_0001 = preload("res://Assets/placeholders/Sprite-0001.png")

func set_player(username: String) -> void:
	usernameLabel.text = username
	usernameLabel.modulate = Color(1, 1, 1, 1)
	avatar.texture = SPRITE_0001
	avatar.modulate = Color(1, 1, 1, 1)
