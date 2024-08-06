import { defineStore } from 'pinia'
import { useBoardStore } from '@/stores/boardStore'
import { computed, reactive, ref } from 'vue'
import { getNextFreeIdReactive } from '@/utilities/helpers'
import { useGuessStore } from '@/stores/guessStore'
import { useLetterStore } from '@/stores/letterStore'
import { getRandomWord } from '@/utilities/words'
import { useSunStore } from '@/stores/sunStoreQueued'
import { TEST_SOLUTION } from '@/config/wordo'
import { useKeyboardStore } from '@/stores/keyboardStore'

export const useWordoStore = defineStore('wordo', () => {
  // state
  const activeGameId = ref(null)
  const games = reactive({})

  // store dependencies
  const boardStore = useBoardStore()
  const guessStore = useGuessStore()
  const letterStore = useLetterStore()
  const keyboardStore = useKeyboardStore()
  const sunStore = useSunStore()

  // getters
  const activeElements = computed(() => {
    const game = getActiveGame.value
    const board = boardStore.boards[game.activeBoardId]
    const guess = guessStore.guesses[board.activeGuessId]
    const letter = letterStore.letters[board.activeLetterId]
    return { game, board, guess, letter }
  })

  const canEnterLetterValue = computed(() => !submissionReady.value && !currentGameFinished.value)

  const getActiveGame = computed(() => (activeGameId.value ? games[activeGameId.value] : null))

  const submissionReady = computed(() =>
    activeElements.value.guess.letters
      .map(l => letterStore.letters[l])
      .reduce((a, v) => {
        // check all letters in guess have a value
        if (!a) return false
        else return !!v.value
      }, true)
  )

  const currentGameFinished = computed(() => activeElements.value.game.finished)

  const canSubmitGuess = computed(() => submissionReady.value && !currentGameFinished.value)

  const activeLettersMatchSolution = computed(
    () => activeElements.value.game.solution == guessStore.activeLetters.map(l => l.value).join('')
  )

  // methods
  const getNewSolution = () =>
    ['development', 'test'].includes(import.meta.env.MODE) && TEST_SOLUTION
      ? TEST_SOLUTION.toLowerCase()
      : getRandomWord()

  const startNewGame = () => {
    // reset message store and keyboard
    sunStore.reset()
    keyboardStore.resetKeys()

    // create game
    const gameId = getNextFreeIdReactive(games)
    const newGame = reactive({
      id: gameId,
      finished: false,
      activeBoardId: null,
      solution: getNewSolution(),
    })

    // create board
    const boardStore = useBoardStore()
    const board = boardStore.addNewBoard(gameId)
    newGame.activeBoardId = board.id

    // add new game to games and return it
    games[gameId] = newGame
    activeGameId.value = gameId
    return newGame
  }

  const onLetterSelected = value => {
    // if cannot enter letter value, return
    if (!canEnterLetterValue.value) return

    // get active board, guess and letter
    const { board, guess, letter } = activeElements.value

    // add letter value to letter
    letter.value = value

    // if last letter in row, set submission ready state and return
    if (guessStore.isLastLetterInGuess(guess, letter)) return
    // else increment active letter
    else board.activeLetterId++
  }

  const onGameComplete = () => {
    activeElements.value.game.finished = true
  }

  const onSuccessfulGuess = () => {
    sunStore.sendMessage('You win!', 60000)
    onGameComplete()
  }

  const onIncorrectGuess = () => {
    // inform user of their error
    sunStore.sendMessage('Oops! Please try again.')

    // if use has guesses remaining increment the active guess
    if (boardStore.guessesRemaining > 0) {
      activeElements.value.board.activeGuessId++
      activeElements.value.board.activeLetterId++
    }
    // else, alert user they have lost the game and ask if they would like to try again
    else {
      sunStore.sendMessage('Oh no!  Game Over!', 60000)
      onGameComplete()
    }
  }

  const submitGuess = () => {
    // if can't submit, ignore
    if (!canSubmitGuess.value) return

    // update the status of each letter and key based on the solution
    letterStore.updateActiveLetters()
    keyboardStore.updateKeys()

    // if letter values match solution letters, handle success
    if (activeLettersMatchSolution.value) onSuccessfulGuess()
    // else handle incorrect guess
    else onIncorrectGuess()
  }

  // return interface
  return { activeElements, games, startNewGame, onLetterSelected, submissionReady, submitGuess }
})
