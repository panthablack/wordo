import { computed, reactive } from 'vue'
import { defineStore } from 'pinia'
import { LETTER_STATUSES } from '@/utilities/constants'
import { useWordoStore } from '@/stores/wordoStore'
import { useGuessStore } from '@/stores/guessStore'
import { useBoardStore } from '@/stores/boardStore'

export const useLetterStore = defineStore('letterStore', () => {
  // state
  const letters = reactive({})

  // store dependencies
  const wordoStore = useWordoStore()
  const boardStore = useBoardStore()
  const guessStore = useGuessStore()

  // getters
  const activeLetters = computed(() => guessStore.activeLetters)

  const activeLetterValues = computed(() => activeLetters.value.map(l => l.value))

  const attemptedLetters = computed(() => {
    // get all submitted letters from this game in an array from previous guesses
    const boardLetters = boardStore.currentBoardGuesses.reduce(
      (a, v) => [...a, ...v.letters.map(l => letters[l])],
      []
    )

    // reduce to unique values and return
    return boardLetters.reduce((a, v) => {
      if (a.findIndex(l => l.id === v.id) === -1) a.push(v)
      return a
    }, [])
  })

  const solution = computed(() => wordoStore.activeElements.game.solution)

  const solutionAsArray = computed(() => solution.value.split(''))

  // methods
  const addNewLetter = (id, guessId) => {
    letters[id] = makeNewLetter(id, guessId)
    return letters[id]
  }

  const makeNewLetter = (id, guessId, status = LETTER_STATUSES.EMPTY) =>
    reactive({ id, guessId, value: null, status })

  const getLetterStatus = (letter, index, solution) => {
    // if letter is a match, return found
    if (solution[index] === letter.value) return LETTER_STATUSES.FOUND
    // if letter is not a match, but is included in the solution, return present
    else if (solution.indexOf(letter.value) !== -1) return LETTER_STATUSES.PRESENT
    // else return missing
    else return LETTER_STATUSES.MISSING
  }

  const setLetterStatus = (letter, status) => (letter.status = status)

  const updateActiveLetters = () => {
    // get solution as array
    const solution = solutionAsArray.value
    // get active letters and map values to array
    const letters = activeLetters.value
    // solution and letter values should match lengths
    if (solution.length !== letters.length)
      throw new Error('Solution and guess are different lengths')
    // for each letter in guess, check against the solution for status
    letters.forEach((l, index) => setLetterStatus(l, getLetterStatus(l, index, solution)))
  }

  // interface
  return {
    activeLetterValues,
    activeLetters,
    addNewLetter,
    attemptedLetters,
    letters,
    updateActiveLetters,
  }
})
