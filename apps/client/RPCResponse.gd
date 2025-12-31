class_name RPCResponse
var req_id: int
var method: String
var result: Variant
var error: String

func _init(data: Dictionary) -> void:
	req_id = data.get("req_id")
	method = data.get("method")
	result = data.get("result")
	error = data.get("error", "")

func is_ok() -> bool:
	return error == ""

func is_error() -> bool:
	return error != ""
