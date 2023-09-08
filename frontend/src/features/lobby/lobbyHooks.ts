import { Socket } from "socket.io-client"
import { AppDispatch } from "../../app/store"
import { OnlinePlayer, addClient, removeClient, setLobbyId } from "./lobbySlice"

export function setupLobbyController(socket: Socket, dispatch: AppDispatch) {
  socket.on("lobby created", (lobbyId: string, player: OnlinePlayer) => {
    console.log("lobby created", lobbyId)
    dispatch(setLobbyId(lobbyId))
    dispatch(addClient(player))
  })

  socket.on("player joined", (player: OnlinePlayer) => {
    console.log("new player", player.id)
    dispatch(addClient(player))
  })

  socket.on("player left", (playerId: string) => {
    console.log("player left")
    dispatch(removeClient(playerId))
  })

  socket.emit("new lobby", "Player One")
}
