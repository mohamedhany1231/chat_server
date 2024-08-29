import { httpServer } from "./app";
import { ExpressPeerServer } from "peer";

const corsConfig = { origin: ["http://localhost:5173"], credentials: true };

console.log("peer server ran");
const peerServer = ExpressPeerServer(httpServer, {
  allow_discovery: true,
  //   proxied: true,
  port: 3000,
  //   path: "/call",
  //   corsOptions: corsConfig,
});

peerServer.on("disconnect", (client) => {
  console.log("dc : ", client.getId());
});
peerServer.on("connection", (client) => {
  console.log("connection");
  console.log(client.getId());
});
peerServer.on("call", () => {
  console.log("call");
});

export default peerServer;
