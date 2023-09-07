import { Server } from "socket.io";
import useLobbyController from "./controllers/lobbyController";

const io = new Server();

io.on("connection", (socket) => {
  const { onNewLobby, onJoinLobby } = useLobbyController(io, socket);

  socket.on("new lobby", onNewLobby);
  socket.on("join lobby", onJoinLobby);
});

io.listen(3000);
