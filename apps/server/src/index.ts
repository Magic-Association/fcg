import { WebSocketServer, WebSocket } from "ws";
import RPC, { RPCResponse } from "./rpc/rpcTypes.js";
import rpcHandler from "./rpc/rpcHandler.js";

const PORT = 5026;
const wss = new WebSocketServer({ port: PORT });

console.log(`WebSocket server started on ws://localhost:${PORT}`);

wss.on("connection", function connection(ws, req) {
  console.log("New connection from", req.socket.remoteAddress);

  ws.on("error", console.error);
  ws.on("message", function incoming(data) {
    onMessage(ws, data);
  });
});

function onMessage(ws: WebSocket, data: WebSocket.Data) {
  console.log(`Received: ${data}`);
  const rpc = JSON.parse(data.toString()) as RPC;
  try {
    const result = rpcHandler(ws, rpc);
    const response: RPCResponse = {
      req_id: rpc.req_id,
      method: rpc.method,
      result,
    };
    ws.send(JSON.stringify(response));
  } catch (error) {
    console.error("Error handling RPC:", error);
    const response: RPCResponse = {
      req_id: rpc.req_id,
      method: rpc.method,
      error: error instanceof Error ? error.message : String(error),
    };
    console.log(response);
    ws.send(JSON.stringify(response));
  }
}

// unexpected shutdown
function shutdown() {
  console.log("Shutting down game server...");

  wss.close();

  for (const ws of wss.clients) {
    ws.terminate();
  }

  process.exit(0);
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
