import { defineStore } from 'pinia'

export type GameState = 'home' | 'playing' | 'paused' | 'pre-end' | 'end'
export type PlayMode = 'vs-ai' | 'vs-player'
export type PlayerMark = 'X' | 'O'
export type Board = (PlayerMark | null)[][]
export type Cell = { row: number; col: number }

const MIN_BOARD_SIZE = 3
const MAX_BOARD_SIZE = 15
const DEFAULT_WINNING_CONSECUTIVE = 5
const DEFAULT_ROUND_RESULTS = {
  X: 0,
  O: 0,
  ties: 0
}

export const useGameTicTacToeStore = defineStore('gameTicTacToe', () => {
  const gameState = ref<GameState>('home')

  function setGameState(state: GameState) {
    gameState.value = state
  }

  function transitionToEndGame() {
    gameState.value = 'pre-end' // For result animation

    setTimeout(() => {
      gameState.value = 'end'
    }, 1000)
  }

  const playMode = ref<PlayMode | null>(null)
  const isPlayingVsAI = computed(() => playMode.value === 'vs-ai')

  function setPlayMode(mode: PlayMode | null) {
    playMode.value = mode
  }

  const currentPlayer = ref<PlayerMark>('X')

  function setCurrentPlayer(mark: PlayerMark) {
    currentPlayer.value = mark
  }

  const isCurrentPlayerX = computed(() => currentPlayer.value === 'X')
  const isCurrentPlayerO = computed(() => currentPlayer.value === 'O')

  const boardSize = ref(MIN_BOARD_SIZE)
  const board = ref(generateBoard(boardSize.value, boardSize.value))
  const winningConsecutive = computed(() => Math.min(boardSize.value, DEFAULT_WINNING_CONSECUTIVE))

  function setBoardSize(size: number) {
    boardSize.value = Math.min(Math.max(size, MIN_BOARD_SIZE), MAX_BOARD_SIZE)
  }

  const currentTurn = ref<PlayerMark>('X')
  const isCurrentPlayerTurn = computed(() => currentPlayer.value === currentTurn.value)

  function switchTurn() {
    currentTurn.value = currentTurn.value === 'X' ? 'O' : 'X'
  }

  const roundWinner = ref<PlayerMark | null>(null)
  const roundWinningCells = ref<Cell[]>([])
  const roundResults = ref(DEFAULT_ROUND_RESULTS)

  const lastMove = ref<Cell | null>(null)

  function isLastMove(row: number, col: number) {
    return lastMove.value?.row === row && lastMove.value?.col === col
  }

  function makeMove(row: number, col: number) {
    if (board.value[row][col] || gameState.value === 'end') return

    const mark = currentTurn.value

    board.value[row][col] = mark
    lastMove.value = { row, col }

    const { isWinningMove, winningCells } = checkMoveForWin(board.value, mark, row, col, winningConsecutive.value)

    if (isWinningMove) {
      roundWinner.value = mark
      roundWinningCells.value = winningCells
      roundResults.value[mark]++
      transitionToEndGame()

      return
    }

    const isBoardFull = board.value.every((row) => row.every((cell) => cell !== null))

    if (isBoardFull) {
      roundResults.value.ties++
      transitionToEndGame()

      return
    }

    switchTurn()
  }

  function clearBoard() {
    board.value = generateBoard(boardSize.value, boardSize.value)
    roundWinner.value = null
    roundWinningCells.value = []
    lastMove.value = null
  }

  function resetGame() {
    setPlayMode(null)
    clearBoard()
    roundResults.value.X = roundResults.value.O = roundResults.value.ties = 0
  }

  return {
    gameState,
    setGameState,
    playMode,
    isPlayingVsAI,
    setPlayMode,
    currentPlayer,
    setCurrentPlayer,
    isCurrentPlayerX,
    isCurrentPlayerO,
    boardSize,
    setBoardSize,
    board,
    clearBoard,
    winningConsecutive,
    currentTurn,
    switchTurn,
    isCurrentPlayerTurn,
    roundWinner,
    roundWinningCells,
    roundResults,
    lastMove,
    isLastMove,
    makeMove,
    resetGame
  }
})

function generateBoard(row: number, col: number) {
  return Array.from({ length: row }, () => Array.from({ length: col }, () => null)) as Board
}

function checkMoveForWin(
  board: Board,
  player: PlayerMark,
  row: number,
  col: number,
  winningConsecutive: number
): { isWinningMove: boolean; winningCells: Cell[] } {
  const rowLength = board.length
  const colLength = board[0].length

  // Helper function to find consecutive marks in a given direction and return the cells
  function findConsecutiveCells(rowStep: number, colStep: number): Cell[] {
    const consecutiveCells: Cell[] = []
    let x = row
    let y = col

    // Move in the positive direction (right/down)
    while (x >= 0 && x < rowLength && y >= 0 && y < colLength && board[x][y] === player) {
      consecutiveCells.push({ row: x, col: y })
      x += rowStep
      y += colStep
    }

    // Reset to original position and move in the negative direction (left/up)
    x = row - rowStep
    y = col - colStep

    while (x >= 0 && x < rowLength && y >= 0 && y < colLength && board[x][y] === player) {
      consecutiveCells.push({ row: x, col: y })
      x -= rowStep
      y -= colStep
    }

    return consecutiveCells
  }

  // Check in all four directions
  const directionVectors = [
    { rowStep: 0, colStep: 1 }, // horizontal
    { rowStep: 1, colStep: 0 }, // vertical
    { rowStep: 1, colStep: 1 }, // diagonal
    { rowStep: 1, colStep: -1 } // anti-diagonal
  ]

  for (const { rowStep, colStep } of directionVectors) {
    const consecutiveCells = findConsecutiveCells(rowStep, colStep)

    if (consecutiveCells.length >= winningConsecutive) {
      return { isWinningMove: true, winningCells: consecutiveCells }
    }
  }

  return { isWinningMove: false, winningCells: [] }
}
