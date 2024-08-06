import { DEFAULT_MESSAGE_TIMEOUT } from '@/config/wordo'
import { useTimeoutFn } from '@vueuse/core'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSunStore = defineStore('sunStore', () => {
  // State
  const message = ref('')
  const messageControls = ref({})

  // Methods
  const closeMessage = () => {
    if (messageControls.value.isPending) messageControls.value.stop()
    message.value = ''
    delete messageControls.value.isPending
    delete messageControls.value.start
    delete messageControls.value.stop
  }

  const reset = () => closeMessage()

  const setControls = (isPending, start, stop) => {
    messageControls.value.isPending = isPending
    messageControls.value.start = start
    messageControls.value.stop = stop
  }

  const sendMessage = (m, t = DEFAULT_MESSAGE_TIMEOUT) => {
    if (messageControls.value.isPending) closeMessage()
    message.value = m
    const { isPending, start, stop } = useTimeoutFn(() => closeMessage(), t)
    setControls(isPending, start, stop)
  }

  // Interface
  return { closeMessage, message, sendMessage, reset }
})
