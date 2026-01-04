@tool
extends PanelContainer
class_name MatchEntry

@onready var label: Label = $VBoxContainer/Gamemode
@onready var playersContainer: GridContainer = $VBoxContainer/Players
@onready var join: Button = $VBoxContainer/Join

const PLAYER_SLOT = preload("res://UI/match_list/player_slot.tscn")

var room_id: int
var max_players := 0

func setup(match_data: Room) -> void:
	room_id = match_data.id
	var gamemode = match_data.get("gamemode")
	label.text = "%s (Room ID: %s)" % [gamemode.get("name"), room_id]
	
	var teamSetup: Array = gamemode.get("teamSetup")
	for team: Dictionary in teamSetup:
		for i in team.get("size"):
			max_players += 1
			playersContainer.add_child(PLAYER_SLOT.instantiate())
			
	update_data(match_data)

func update_data(new_match_data: Room) -> void:
	var players: Array[int] = new_match_data.get("players")
	
	join.disabled = true if players.size() >= max_players else false
	
	for i in players.size():
		var slot := playersContainer.get_child(i)
		slot.set_player("Client %s" % players[i])

func _on_join_pressed() -> void:
	await RPCRegistry.join_match(room_id)
