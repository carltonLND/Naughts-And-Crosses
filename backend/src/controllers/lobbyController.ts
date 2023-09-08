import { Server, Socket } from "socket.io";
import { v4 as uuid } from "uuid";

interface Player {
  id: string;
  name: string;
}

interface NameLookup {
  [id: string]: string;
}

const nameLookup: NameLookup = {};

export default function useLobbyController(io: Server, socket: Socket) {
  const onNewLobby = async (name: string) => {
    nameLookup[socket.id] = name;

    const roomId = uuid();
    socket.join(roomId);

    const newPlayer: Player = {
      id: socket.id,
      name,
    };

    io.to(socket.id).emit("lobby created", roomId, newPlayer);
  };

  const onJoinLobby = async (name: string, roomId: string) => {
    const room = io.sockets.adapter.rooms.get(roomId);
    if (!room || room.size === 2) return;

    nameLookup[socket.id] = name;

    socket.join(roomId);

    const newPlayer: Player = {
      id: socket.id,
      name,
    };

    socket.to(roomId).emit("player joined", newPlayer);

    const connectedSockets = await io.to(roomId).fetchSockets();
    const players: Player[] = connectedSockets.map((sock) => ({
      id: sock.id,
      name: nameLookup[sock.id],
    }));

    io.to(socket.id).emit("lobby joined", players);
  };

  const onLeaveLobby = (roomId: string) => {
    const room = io.sockets.adapter.rooms.get(roomId);
    if (!room || !room.has(socket.id)) return;

    delete nameLookup[socket.id];

    socket.leave(roomId);

    socket.to(roomId).emit("player left", socket.id);
  };

  const onDisconnecting = () => {
    delete nameLookup[socket.id];

    for (const roomId of socket.rooms) {
      socket.leave(roomId);
      socket.to(roomId).emit("player left", socket.id);
    }
  };

  return { onNewLobby, onJoinLobby, onLeaveLobby, onDisconnecting };
}
