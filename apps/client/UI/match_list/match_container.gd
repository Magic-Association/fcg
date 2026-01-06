@tool
extends VBoxContainer

const MATCH_ENTRY = preload("res://UI/match_list/match_entry.tscn")

var match_entries: Dictionary[int, MatchEntry] = {}
	
func _ready() -> void:
	if Engine.is_editor_hint():
		for i in 10:
			create_match_entry(Room.new({
				"id": i,
				"gamemode": {
					"name": "Mock Match %d"% (i + 1),
					"teamSetup": [{ "size": 1 }, { "size": 1 }]
				}
			}))
	else:
		Broadcasts.match_updated.connect(_on_match_updated)
		Broadcasts.match_removed.connect(_on_match_removed)
	
		var match_data := await RPCRegistry.hello()
		for room: Room in match_data:
			create_match_entry(room)
	
func create_match_entry(match_data: Room) -> void:
	var match_entry: MatchEntry = MATCH_ENTRY.instantiate()
	add_child(match_entry)
	move_child(match_entry, 0)
	match_entry.setup(match_data)
	match_entries[match_data.id] = match_entry
		
func _on_match_updated(room: Room) -> void:
	if match_entries.has(room.id):
		var match_entry: MatchEntry = match_entries.get(room.id)
		match_entry.update_data(room)
	else:
		create_match_entry(room)
	
func _on_match_removed(roomId: int) -> void:
	if not match_entries.has(roomId):
		return
	var match_entry: MatchEntry = match_entries.get(roomId)
	match_entries.erase(roomId)
	match_entry.queue_free()
	
