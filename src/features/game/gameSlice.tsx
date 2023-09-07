import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { RootState } from "../../app/store"
import {
  Cell,
  Player,
  Board,
  generateGrid,
  checkWin,
  toggleActivePlayer,
  checkDraw,
} from "./gameLogic"

interface GameBoardState {
  currPlayer: Player
  boardSize: number
  board: Board
  winner: Player | "draw" | null
}

const initialState: GameBoardState = {
  currPlayer: "O",
  boardSize: 3,
  board: generateGrid(3),
  winner: null,
}

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setBoardSize: (state, action: PayloadAction<number>) => {
      if (action.payload >= 3) {
        state.boardSize = action.payload
      }
    },
    newBoard: (state, action: PayloadAction<number | undefined>) => {
      state.board = generateGrid(action.payload ?? state.boardSize)
      state.currPlayer = "O"
      state.winner = null
    },
    claimCell: (state, action: PayloadAction<number>) => {
      const cell = state.board
        .flat()
        .find((c) => c.id === action.payload) as Cell

      if (cell.ownedBy != null) return
      cell.ownedBy = state.currPlayer

      if (checkWin(state.board, state.currPlayer)) {
        state.winner = state.currPlayer
      }

      if (checkDraw(state.board)) {
        state.winner = "draw"
      }

      state.currPlayer = toggleActivePlayer(state.currPlayer)
    },
    swapPlayer: (state) => {
      state.currPlayer = toggleActivePlayer(state.currPlayer)
    },
    setWinner: (state, action: PayloadAction<Player>) => {
      state.winner = action.payload
    },
  },
})

export const { newBoard, claimCell, swapPlayer, setWinner } = gameSlice.actions

export const selectBoard = (state: RootState) => state.game.board
export const selectCurrPlayer = (state: RootState) => state.game.currPlayer
export const selectWinner = (state: RootState) => state.game.winner

export default gameSlice.reducer