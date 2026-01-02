extends HBoxContainer

@onready var username: Label = $Username
@onready var profile_picture: TextureRect = $ProfileMask/ProfilePicture

func _ready() -> void:
	var res: Variant = await Web.got_web_info
	username.text = res.username
	
	var profile := Image.new()
	profile.load_png_from_buffer(Marshalls.base64_to_raw(res.avatar))
	profile_picture.texture = ImageTexture.create_from_image(profile)
