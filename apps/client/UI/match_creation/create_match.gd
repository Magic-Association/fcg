extends Button

func _on_pressed() -> void:
	await RPCRegistry.create_match()
