import { ALPHABET } from '@/utilities/constants'
import { onKeyStroke } from '@vueuse/core'
import { reactive } from 'vue'

export const watchAlphaKeys = callback => {
  const keys = reactive({})

  ALPHABET.forEach(letter => {
    // handle letters
    keys[letter] = onKeyStroke(letter, () => {
      if (callback) callback(letter)
    })

    // handle capital letters the same
    keys[letter.toUpperCase()] = onKeyStroke(letter.toUpperCase(), () => {
      if (callback) callback(letter.toUpperCase())
    })
  })

  return { keys }
}
