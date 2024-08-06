import { DEFAULT_MESSAGE_TIMEOUT } from '@/config/wordo'
import { useTimeoutFn } from '@vueuse/core'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSunStore = defineStore('sunStore', () => {
  // State
  const message = ref('')
  const messageControls = ref({})
  const messageQueue = ref([])

  // Methods
  const clearMessageQueue = () => (messageQueue.value = [])

  const closeMessage = () => {
    if (messageControls.value.isPending) messageControls.value.stop()
    message.value = ''
    delete messageControls.value.isPending
    delete messageControls.value.start
    delete messageControls.value.stop
    if (messageQueue.value.length) {
      const [m, t] = messageQueue.value.shift()
      sendMessage(m, t)
    }
  }

  const reset = () => {
    clearMessageQueue()
    closeMessage()
  }

  const sendMessage = (m, t = DEFAULT_MESSAGE_TIMEOUT) => {
    message.value = m
    if (messageControls.value.isPending) messageQueue.value.push([m, t])
    else if (t > 0) {
      const { isPending, start, stop } = useTimeoutFn(() => closeMessage(), t)
      messageControls.value.isPending = isPending
      messageControls.value.start = start
      messageControls.value.stop = stop
    }
  }

  // Interface
  return { closeMessage, message, messageQueue, sendMessage, reset }
})
