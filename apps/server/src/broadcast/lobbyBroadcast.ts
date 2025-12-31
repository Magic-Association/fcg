import { lobby } from "../lobby/lobby.js";
import { Room } from "../rooms.js";
import connectionMap from "../rpc/hello.js";

type LobbyBroadcast =
  | {
      action: "update_match";
      payload: Room;
    }
  | {
      action: "remove_match";
      payload: number;
    };

export default function lobbyBroadcast(message: LobbyBroadcast) {
  for (const clientId of lobby.players) {
    const ws = connectionMap.get(clientId);
    if (!ws) continue;
    ws.send(JSON.stringify(message));
  }
}
