@tool
extends PanelContainer
class_name MatchEntry

@onready var label: Label = $VBoxContainer/Gamemode
@onready var players: HBoxContainer = $VBoxContainer/Players

const PLAYER_PLACEHOLDER = preload("res://UI/match_list/player_placeholder.tscn")

var room_id: int

func setup(match_data: Room) -> void:
	room_id = match_data.id
	var gamemode = match_data.get("gamemode")
	label.text = gamemode.get("name")
	
	var teamSetup: Array = gamemode.get("teamSetup")
	for team: Dictionary in teamSetup:
		for i in team.get("size"):
			players.add_child(PLAYER_PLACEHOLDER.instantiate())
	
	update_data(match_data)

func update_data(new_match_data: Room) -> void:
	pass
