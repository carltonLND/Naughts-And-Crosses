import { Server } from "socket.io";
import useLobbyController from "./controllers/lobbyController";

const io = new Server();

io.on("connection", (socket) => {
  const lobbyController = useLobbyController(io, socket);

  socket.on("new lobby", lobbyController.onNewLobby);
  socket.on("join lobby", lobbyController.onJoinLobby);
  socket.on("leave lobby", lobbyController.onLeaveLobby);
});

io.listen(3000);
