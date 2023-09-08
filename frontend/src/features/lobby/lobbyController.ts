import { Socket } from "socket.io-client"
import { AppDispatch } from "../../app/store"
import {
  OnlinePlayer,
  addClient,
  removeClient,
  setClientId,
  setLobbyId,
} from "./lobbySlice"

export function setupLobbyListeners(socket: Socket, dispatch: AppDispatch) {
  socket.on("lobby created", (lobbyId: string, player: OnlinePlayer) => {
    dispatch(setLobbyId(lobbyId))
    dispatch(addClient(player))
    dispatch(setClientId(player.id))
  })

  socket.on("player joined", (player: OnlinePlayer) => {
    dispatch(addClient(player))
  })

  socket.on("player left", (playerId: string) => {
    dispatch(removeClient(playerId))
  })
}
