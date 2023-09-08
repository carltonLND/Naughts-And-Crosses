export type Player = "O" | "X"
export type Cell = { id: number; ownedBy?: Player }
export type Board = Cell[][]

export function generateGrid(size: number): Cell[][] {
  const grid: Cell[][] = []
  let cellId = 0
  for (let i = 0; i < size; i++) {
    const row: Cell[] = []
    for (let j = 0; j < size; j++) {
      row.push({
        id: cellId++,
      })
    }

    grid.push(row)
  }

  return grid
}

export function checkWin(board: Board, player: Player) {
  if (checkHorizontal(board, player)) {
    return true
  }

  if (checkHorizontal(columnsToRows(board), player)) {
    return true
  }

  if (checkHorizontal(diagonalsToRows(board), player)) {
    return true
  }

  return false
}

export function checkDraw(board: Board) {
  return !board.flat().some((cell) => cell.ownedBy == null)
}

function checkHorizontal(board: Board, player: Player): boolean {
  for (const row of board) {
    if (row.every((cell) => cell.ownedBy && cell.ownedBy === player)) {
      return true
    }
  }

  return false
}

function columnsToRows(board: Board): Board {
  const newBoard: Board = []

  for (let column = 0; column < board.length; column++) {
    const newRow: Cell[] = []
    for (let row = 0; row < board.length; row++) {
      newRow.push(board[row][column])
    }

    newBoard.push(newRow)
  }

  return newBoard
}

function diagonalsToRows(board: Board) {
  const newBoard: Board = [[], []]

  let increment = 0
  let decrement = board.length - 1

  while (increment < board.length) {
    newBoard[0].push(board[increment][increment])
    newBoard[1].push(board[increment][decrement])
    increment++
    decrement--
  }

  return newBoard
}
