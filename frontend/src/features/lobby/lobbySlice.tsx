import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { RootState } from "../../app/store"
import { Player } from "../game/gameLogic"

export interface OnlinePlayer {
  id: string
  name: string
  token: Player
}

interface LobbyState {
  id: string
  thisClient: OnlinePlayer
  clients: OnlinePlayer[]
}

const initialState: LobbyState = {
  id: "",
  thisClient: { id: "", name: "", token: "O" },
  clients: [],
}

export const lobbySlice = createSlice({
  name: "lobby",
  initialState,
  reducers: {
    resetLobby: () => {
      return initialState
    },
    setClientToken: (state, action: PayloadAction<Player>) => {
      state.thisClient.token = action.payload
    },
    setClientName: (state, action: PayloadAction<string>) => {
      state.thisClient.name = action.payload
    },
    setClientId: (state, action: PayloadAction<string>) => {
      state.thisClient.id = action.payload
    },
    setLobbyId: (state, action: PayloadAction<string>) => {
      state.id = action.payload
    },
    setClients: (state, action: PayloadAction<OnlinePlayer[]>) => {
      state.clients = action.payload
    },
    addClient: (state, action: PayloadAction<OnlinePlayer>) => {
      state.clients.push(action.payload)
    },
    removeClient: (state, action: PayloadAction<string>) => {
      const filteredClients = state.clients.filter(
        (client) => client.id !== action.payload,
      )

      if (filteredClients.length === 0) {
        return initialState
      }

      state.clients = filteredClients
    },
  },
})

export const {
  resetLobby,
  setLobbyId,
  setClients,
  addClient,
  removeClient,
  setClientName,
  setClientId,
  setClientToken,
} = lobbySlice.actions

export const selectLobbyId = (state: RootState) => state.lobby.id
export const selectClients = (state: RootState) => state.lobby.clients
export const selectThisClientToken = (state: RootState) =>
  state.lobby.thisClient.token
export const selectThisClientName = (state: RootState) =>
  state.lobby.thisClient.name

export default lobbySlice.reducer
