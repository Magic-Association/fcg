class_name RPCRegistry

static func hello() -> Array:
	var res: RPCResponse = await Network.fetch_rpc("hello")
	if not res.result is Array:
		return []
	return res.result
