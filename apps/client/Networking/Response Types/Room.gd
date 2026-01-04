class_name Room

var id: int
var gamemode: Dictionary
var players: Array[int]

func _init(data: Dictionary) -> void:
	id = data.get("id", -1)
	gamemode = data.get("gamemode")
	var players_raw = data.get("players", [])
	for player_id in players_raw:
		players.append(int(player_id))
