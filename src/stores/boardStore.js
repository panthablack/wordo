import { computed, reactive } from 'vue'
import { defineStore } from 'pinia'
import { ALLOWED_GUESSES, WORD_LENGTH } from '@/config/wordo'
import { useLetterStore } from '@/stores/letterStore'
import { useGuessStore } from '@/stores/guessStore'
import { getNextFreeIdReactive } from '@/utilities/helpers'
import { useWordoStore } from '@/stores/wordoStore'

export const useBoardStore = defineStore('boardStore', () => {
  // state
  const boards = reactive({})

  // store dependencies
  const guessStore = useGuessStore()
  const letterStore = useLetterStore()
  const wordoStore = useWordoStore()

  // getters
  const currentBoardGuessIds = computed(() => wordoStore.activeElements.board.guesses)

  const currentBoardGuesses = computed(() =>
    currentBoardGuessIds.value.map(g => guessStore.guesses[g])
  )

  const guessesRemaining = computed(() => {
    const activeGuessId = wordoStore.activeElements.guess.id
    const idx = currentBoardGuessIds.value.findIndex(g => g === activeGuessId)
    return ALLOWED_GUESSES - idx - 1
  })

  // methods
  const makeNewBoard = (id, gameId) =>
    reactive({ id, gameId, guesses: [], activeGuessId: null, activeLetterId: null })

  const addNewBoard = gameId => {
    const guesses = guessStore.guesses
    const letters = letterStore.letters

    // make new board
    const boardId = getNextFreeIdReactive(boards)
    const board = makeNewBoard(boardId, gameId)

    // calculate starting id for guesses and letters
    const guessStart = getNextFreeIdReactive(guesses)
    const guessEnd = guessStart + ALLOWED_GUESSES - 1
    const firstGuessLetterStart = getNextFreeIdReactive(letters)

    // Create guesses
    for (let g = guessStart; g <= guessEnd; g++) {
      const newGuess = guessStore.addNewGuess(g, boardId)
      board.guesses.push(g)
      const letterStart = getNextFreeIdReactive(letters)
      const letterEnd = letterStart + WORD_LENGTH - 1
      // For each guess create a set of letters
      for (let l = letterStart; l <= letterEnd; l++) {
        letterStore.addNewLetter(l, g)
        newGuess.letters.push(l)
      }
    }

    // set active guess and letter ID
    board.activeGuessId = guessStart
    board.activeLetterId = firstGuessLetterStart

    // set and return board
    boards[boardId] = board
    return board
  }

  // return interface
  return { addNewBoard, boards, currentBoardGuesses, guessesRemaining }
})
