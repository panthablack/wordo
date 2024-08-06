export const ALPHABET = Object.freeze([
  ...['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'],
  ...['i', 'j', 'k', 'l', 'm', 'n', 'o', 'p'],
  ...['q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
])

export const KEYBOARD_KEY_TYPES = Object.freeze({
  ALPHABET: 1,
  ENTER: 2,
  DELETE: 3,
})

export const KEYBOARD_LAYOUT = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
  ['z', 'x', 'c', 'v', 'b', 'n', 'm'],
]

export const KEYBOARD_STATUSES = Object.freeze({
  UNATTEMPTED: 1,
  MISSING: 2,
  PRESENT: 3,
  FOUND: 4,
})

export const LETTER_STATUSES = Object.freeze({
  EMPTY: 1,
  MISSING: 2,
  PRESENT: 3,
  FOUND: 4,
  FILLED: 5,
})
