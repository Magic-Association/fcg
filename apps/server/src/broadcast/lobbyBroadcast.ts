import { lobby } from "../lobby/lobby.js";
import { Room } from "../rooms.js";
import connectionMap from "../rpc/hello.js";

type LobbyBroadcast =
  | {
      action: "update";
      payload: Room;
    }
  | {
      action: "remove";
      payload: number;
    };

export default function lobbyBroadcast(message: LobbyBroadcast) {
  for (const clientId of lobby.players) {
    const ws = connectionMap.get(clientId);
    if (!ws) continue;
    ws.send(JSON.stringify({ ...message, type: "matchList" }));
  }
}
