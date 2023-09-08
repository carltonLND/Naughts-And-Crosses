import { Server } from "socket.io";
import useLobbyController from "./controllers/lobbyController";

const io = new Server({
  cors: { origin: "http://localhost:5173", credentials: true },
});

io.on("connection", (socket) => {
  const lobbyController = useLobbyController(io, socket);

  socket.on("new lobby", lobbyController.onNewLobby);
  socket.on("join lobby", lobbyController.onJoinLobby);
  socket.on("leave lobby", lobbyController.onLeaveLobby);
  socket.on("disconnecting", lobbyController.onDisconnecting);
});

io.listen(3000);
