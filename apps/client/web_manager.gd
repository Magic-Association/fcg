extends Node

var window := JavaScriptBridge.get_interface("window")
var console: = JavaScriptBridge.get_interface("console")
var callback_ref := JavaScriptBridge.create_callback(recieve_web_info)

signal got_web_info(info: Variant)

func _ready() -> void:
	if not OS.has_feature("web"):
		return
	
	@warning_ignore("unsafe_method_access")
	window.addEventListener("message", callback_ref)
	
	@warning_ignore("unsafe_property_access", "unsafe_method_access")
	window.parent.postMessage(JSON.stringify({"godot_client_ready": true}), "*")
	@warning_ignore("unsafe_method_access")
	console.log("Web Manager Ready")

func recieve_web_info(args: Array) -> void:
	var message: Variant = args[0].data
	got_web_info.emit(message)
	@warning_ignore("unsafe_method_access")
	console.log("Recieved web info: ", message)
