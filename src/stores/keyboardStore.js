import { useLetterStore } from '@/stores/letterStore'
import {
  KEYBOARD_KEY_TYPES,
  KEYBOARD_LAYOUT,
  KEYBOARD_STATUSES,
  LETTER_STATUSES,
} from '@/utilities/constants'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useKeyboardStore = defineStore('keyboardStore ', () => {
  // state
  const keyboardKeys = ref([])

  // store dependencies
  const letterStore = useLetterStore()

  // getters
  const flattenedKeys = computed(() => keyboardKeys.value.flat())

  // Methods
  const makeNewKey = (
    name,
    id,
    type = KEYBOARD_KEY_TYPES.ALPHABET,
    status = KEYBOARD_STATUSES.UNATTEMPTED
  ) => ({ name, id, type, status })

  const resetKeys = () => {
    // reset ref array
    keyboardKeys.value = []

    KEYBOARD_LAYOUT.forEach((row, i) => {
      // make new row
      keyboardKeys.value.push([])
      // for each letter in the row, create a keyboard key instance
      row.forEach(k => keyboardKeys.value[i].push(makeNewKey(k, k)))
    })

    // add enter key to start of third row
    keyboardKeys.value[2].unshift(makeNewKey('enter', 'enter', KEYBOARD_KEY_TYPES.ENTER))
    // add delete key to end of third row
    keyboardKeys.value[2].push(makeNewKey('delete', 'delete', KEYBOARD_KEY_TYPES.DELETE))
  }

  const setKeyStatus = (k, status) => (k.status = status)

  const updateKeyStatus = k => {
    // if not an alphabet character, return
    if (k.type !== KEYBOARD_KEY_TYPES.ALPHABET) return
    // check if letter attempted
    const matchingAttemptedLetter = letterStore.attemptedLetters.find(l => l.value === k.name)
    // if not attempted, set UNATTEMPTED and return
    if (!matchingAttemptedLetter) return setKeyStatus(k, KEYBOARD_STATUSES.UNATTEMPTED)
    // else set status of key based on status of attempted letter
    const statusMap = {
      [LETTER_STATUSES.EMPTY]: KEYBOARD_STATUSES.UNATTEMPTED,
      [LETTER_STATUSES.MISSING]: KEYBOARD_STATUSES.MISSING,
      [LETTER_STATUSES.FILLED]: KEYBOARD_STATUSES.FILLED,
      [LETTER_STATUSES.PRESENT]: KEYBOARD_STATUSES.PRESENT,
      [LETTER_STATUSES.FOUND]: KEYBOARD_STATUSES.FOUND,
    }
    setKeyStatus(k, statusMap[matchingAttemptedLetter.status])
  }

  const updateKeys = () => flattenedKeys.value.forEach(k => updateKeyStatus(k))

  // Interface
  return { keyboardKeys, resetKeys, updateKeys }
})
