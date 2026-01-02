extends Node

var window := JavaScriptBridge.get_interface("window")
var console: = JavaScriptBridge.get_interface("console")
var callback_ref := JavaScriptBridge.create_callback(receive_web_info)

signal got_web_info(info: Variant)

func _ready() -> void:
	if not OS.has_feature("web"):
		return
	
	window.addEventListener("message", callback_ref)
	window.parent.postMessage(JSON.stringify({"godot_client_ready": true}), "*")
	console.log("Web Manager Ready")

func receive_web_info(args: Array) -> void:
	var message: Variant = args[0].data
	got_web_info.emit(message)
	console.log("Recieved web info: ", message)
