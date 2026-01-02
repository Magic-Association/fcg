class_name Room

var id: int
var name: String
var players: Array[int]

func _init(data: Dictionary) -> void:
	id = data.get("id", -1)
	name = data.get("name", "No Name")
	var players_raw = data.get("players", [])
	for player_id in players_raw:
		players.append(int(player_id))
