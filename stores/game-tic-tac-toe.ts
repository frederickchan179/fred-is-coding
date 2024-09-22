import { defineStore } from 'pinia'

export type GameState = 'home' | 'playing' | 'paused' | 'end'
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

  function clearBoard() {
    board.value = generateBoard(boardSize.value, boardSize.value)
  }

  const currentTurn = ref<PlayerMark>('X')
  const isCurrentPlayerTurn = computed(() => currentPlayer.value === currentTurn.value)

  function switchTurn() {
    currentTurn.value = currentTurn.value === 'X' ? 'O' : 'X'
  }

  const roundWinner = ref<PlayerMark | null>(null)
  const roundResults = ref(DEFAULT_ROUND_RESULTS)

  const lastMove = ref<Cell | null>(null)

  function isLastMove(row: number, col: number) {
    return lastMove.value?.row === row && lastMove.value?.col === col
  }

  function makeMove(row: number, col: number) {
    if (board.value[row][col]) return

    const mark = currentTurn.value

    board.value[row][col] = mark
    lastMove.value = { row, col }

    const isCurrentPlayerWin = checkWinnerOnMove(board.value, mark, row, col, winningConsecutive.value)

    if (isCurrentPlayerWin) {
      roundWinner.value = mark
      roundResults.value[mark]++
      setGameState('end')

      return
    }

    const isBoardFull = board.value.every((row) => row.every((cell) => cell !== null))

    if (isBoardFull) {
      roundResults.value.ties++
      setGameState('end')

      return
    }

    switchTurn()
  }

  function resetGame() {
    setPlayMode(null)
    clearBoard()
    roundWinner.value = null
    roundResults.value = DEFAULT_ROUND_RESULTS
    lastMove.value = null
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

function checkWinnerOnMove(
  board: Board,
  player: PlayerMark,
  row: number,
  col: number,
  winningConsecutive: number
): boolean {
  const rowLength = board.length
  const colLength = board[0].length

  // Helper function to count consecutive marks in a given direction
  function countConsecutive(dx: number, dy: number): number {
    let count = 0
    let x = row
    let y = col

    // Move in the positive direction (right/down)
    while (x >= 0 && x < rowLength && y >= 0 && y < colLength && board[x][y] === player) {
      count++
      x += dx
      y += dy
    }

    // Reset to original position and move in the negative direction (left/up)
    x = row - dx
    y = col - dy

    while (x >= 0 && x < rowLength && y >= 0 && y < colLength && board[x][y] === player) {
      count++
      x -= dx
      y -= dy
    }

    return count
  }

  if (countConsecutive(0, 1) >= winningConsecutive) return true // horizontal
  if (countConsecutive(1, 0) >= winningConsecutive) return true // vertical
  if (countConsecutive(1, 1) >= winningConsecutive) return true // diagonal
  if (countConsecutive(1, -1) >= winningConsecutive) return true // anti-diagonal

  return false
}
