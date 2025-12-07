import { WebSocketServer, WebSocket } from "ws";
import rpcHandler from "./rpc/rpcs.js";
import RPC, { RPCResponse } from "./types/RPC.js";

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
  if (typeof data !== "string") {
    console.error("Received non-string message");
    return;
  }
  console.log(`Received: ${data}`);
  const rpc = JSON.parse(data) as RPC;
  try {
    const result = rpcHandler(rpc);
    const response: RPCResponse = {
      req_id: rpc.req_id,
      method: rpc.method,
      result,
    };
    ws.send(JSON.stringify(response));
  } catch (error) {
    const response: RPCResponse = {
      req_id: rpc.req_id,
      method: rpc.method,
      error: error instanceof Error ? error.message : String(error),
    };
    console.log(response);
    ws.send(JSON.stringify(response));
  }
}

function shutdown() {
  console.log("Shutting down game server...");

  wss.close((err) => {
    if (err) {
      console.error("Error during server shutdown:", err);
      process.exit(1);
    } else {
      console.log("Game server closed");
      process.exit(0);
    }
  });
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
