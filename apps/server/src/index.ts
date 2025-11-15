import { WebSocketServer, WebSocket } from "ws";
import rpcHandler from "./rpc/rpcs";
import { RPCResponse } from "./types/RPC";

const PORT = 9080;
const wss = new WebSocketServer({ port: PORT });

console.log(`WebSocket server started on ws://localhost:${PORT}`);

wss.on("connection", function connection(ws, req) {
  console.log("New connection from", req.socket.remoteAddress);

  ws.on("error", console.error);
  ws.on("message", function incoming(data) {
    onMessage(ws, data);
  });
});

async function onMessage(ws: WebSocket, data: WebSocket.Data) {
  console.log(`Received: ${data}`);
  const rpc = JSON.parse(data.toString());
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

async function shutdown() {
  console.log("Shutting down game server...");

  const closePromises: Promise<void>[] = [];
  wss.clients.forEach((client) => {
    closePromises.push(
      new Promise<void>((resolve) => {
        client.once("close", () => resolve());
        client.close(1001);
      }),
    );
  });

  await Promise.all(closePromises);

  wss.close(() => {
    console.log("Game server closed");
    process.exit(0);
  });
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
