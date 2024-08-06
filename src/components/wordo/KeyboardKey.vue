<script setup>
import { KEYBOARD_STATUSES } from '@/utilities/constants'
import { computed, ref } from 'vue'

const props = defineProps({ keyboardKey: Object })

const emit = defineEmits(['clicked'])

const keyboardKey = computed(() => props.keyboardKey)

const depressed = ref(false)

const depressedClass = computed(() => (depressed.value ? 'shadow-sm' : 'shadow-md'))

const keyboardKeyClass = computed(() => `${depressedClass.value} ${keyboardStatusClass.value}`)

const keyboardStatusClass = computed(() => {
  const { UNATTEMPTED, MISSING, PRESENT, FOUND } = KEYBOARD_STATUSES
  if (keyboardKey.value.status === UNATTEMPTED) return 'unattempted'
  else if (keyboardKey.value.status === MISSING) return 'missing'
  else if (keyboardKey.value.status === PRESENT) return 'present'
  else if (keyboardKey.value.status === FOUND) return 'found'
  else return ''
})

const onMouseDown = () => (depressed.value = true)

const onMouseUp = () => (depressed.value = false)

const onClick = () => emit('clicked')
</script>

<template>
  <div
    class="keyboardKey select-none"
    :class="keyboardKeyClass"
    @click="onClick"
    @mouseup="onMouseUp"
    @mousedown="onMouseDown"
  >
    <span class="font-bold text-xl uppercase">{{ keyboardKey.name }}</span>
  </div>
</template>

<style scoped>
.keyboardKey {
  @apply rounded-[4px] p-4 min-w-12 h-16 cursor-pointer;

  &.found {
    @apply bg-wordo-found text-white;
  }

  &.missing {
    @apply bg-wordo-missing text-white;
  }

  &.present {
    @apply bg-wordo-present text-white;
  }

  &.unattempted {
    @apply bg-gray-300 border-gray-400 text-gray-900;
  }
}
</style>
