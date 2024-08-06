<script setup>
import { useKeyboardStore } from '@/stores/keyboardStore'
import KeyboardKey from '@/components/wordo/KeyboardKey.vue'
import { computed } from 'vue'

const keyboardStore = useKeyboardStore()
const keyboardKeys = computed(() => keyboardStore.keyboardKeys)

const emit = defineEmits(['keyClicked'])
const onClick = k => emit('keyClicked', k)
</script>

<template>
  <div class="keyboardContainer flex flex-col gap-2 justify-center text-center items-center">
    <div
      class="keyRow flex flex-row gap-2 justify-center text-center items-center"
      v-for="(row, index) in keyboardKeys"
      :key="`row${index}`"
    >
      <KeyboardKey
        v-for="keyboardKey in row"
        :keyboardKey="keyboardKey"
        :key="keyboardKey.id"
        @clicked="onClick(keyboardKey)"
      />
    </div>
  </div>
</template>
