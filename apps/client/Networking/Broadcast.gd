class_name Broadcast

var action: String
var payload: Variant

func _init(data: Dictionary) -> void:
	action = data.get("action")
	payload = data.get("payload")
