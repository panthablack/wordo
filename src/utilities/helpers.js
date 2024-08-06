import { toRaw } from 'vue'

/**
 *
 * @param {Object} o Object with integers as keys
 * @returns {Number} Next available integer based ID
 */
export const getNextFreeId = o => {
  const keys = Object.keys(o)
  if (!keys.length) return 1
  else {
    const intKeys = keys.map(k => parseInt(k))
    const max = Math.max(...intKeys)
    return max + 1
  }
}

/**
 *
 * @param {Object} o Reactive object with integers as keys
 * @returns {Number} Next available integer based ID
 */
export const getNextFreeIdReactive = r => getNextFreeId(toRaw(r))
