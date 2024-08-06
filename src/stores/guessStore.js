import { computed, reactive } from 'vue'
import { defineStore } from 'pinia'
import { useWordoStore } from '@/stores/wordoStore'
import { useLetterStore } from '@/stores/letterStore'

export const useGuessStore = defineStore('guessStore', () => {
  // state
  const guesses = reactive({})

  // store dependencies
  const wordoStore = useWordoStore()
  const letterStore = useLetterStore()

  // getters
  const activeGuess = computed(() => wordoStore.activeElements.guess)

  const activeLetters = computed(
    () => activeGuess.value.letters.map(l => letterStore.letters[l]) || []
  )

  const thereAreFilledLetters = computed(() => !!activeLetters.value[0].value)

  const currentGameFinished = computed(() => wordoStore.activeElements.game.finished)

  const canDeleteLetter = computed(() => thereAreFilledLetters.value && !currentGameFinished.value)

  const latestFilledLetter = computed(() =>
    activeLetters.value.reduce((a, v) => (v?.value ? v : a), null)
  )

  // methods
  const makeNewGuess = (id, boardId) => reactive({ id, boardId, letters: [] })

  const addNewGuess = (id, boardId) => {
    guesses[id] = makeNewGuess(id, boardId)
    return guesses[id]
  }

  const isLastLetterInGuess = (guess, letter) => guess.letters.slice(-1)[0] === letter.id

  const deleteLetter = () => {
    // if can't delete letter, ignore
    if (!canDeleteLetter.value) return
    // else delete the latestFilledLetter's value
    else {
      const letter = latestFilledLetter.value
      letter.value = null
      // if not the last letter, decrement active letter
      if (!isLastLetterInGuess(activeGuess.value, letter))
        wordoStore.activeElements.board.activeLetterId--
    }
  }

  // return interface
  return { activeLetters, addNewGuess, guesses, isLastLetterInGuess, deleteLetter }
})
