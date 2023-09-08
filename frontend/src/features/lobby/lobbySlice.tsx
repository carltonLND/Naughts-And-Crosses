import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { RootState } from "../../app/store"

export interface OnlinePlayer {
  id: string
  name: string
}

interface LobbyState {
  id: string
  clients: OnlinePlayer[]
}

const initialState: LobbyState = {
  id: "",
  clients: [],
}

export const lobbySlice = createSlice({
  name: "lobby",
  initialState,
  reducers: {
    resetLobby: () => {
      return initialState
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

export const { resetLobby, setLobbyId, setClients, addClient, removeClient } =
  lobbySlice.actions

export const selectLobbyId = (state: RootState) => state.lobby.id
export const selectClients = (state: RootState) => state.lobby.clients

export default lobbySlice.reducer
