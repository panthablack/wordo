<script setup>
import { LETTER_STATUSES } from '@/utilities/constants'
import { computed } from 'vue'

const props = defineProps({ letter: { type: Object, required: true } })

const tileClass = computed(() => {
  const { EMPTY, MISSING, PRESENT, FOUND, FILLED } = LETTER_STATUSES
  if (props.letter.status === EMPTY) return ''
  else if (props.letter.status === MISSING) return 'missing'
  else if (props.letter.status === PRESENT) return 'present'
  else if (props.letter.status === FOUND) return 'found'
  else if (props.letter.status === FILLED) return 'filled'
  else return ''
})

const renderValue = computed(() => props.letter.value?.toUpperCase() || '')
</script>

<template>
  <div class="gameTile" :class="tileClass">
    <div class="gameTileContent">
      <span>{{ renderValue }}</span>
    </div>
  </div>
</template>

<style scoped lang="css">
.gameTile {
  @apply w-16 h-16 border border-slate-400 rounded-lg flex items-center justify-center flex-nowrap font-bold text-gray-900;

  &.found {
    @apply bg-wordo-found text-white;
  }

  &.missing {
    @apply bg-wordo-missing text-white;
  }

  &.present {
    @apply bg-wordo-present text-white;
  }

  &.filled {
    @apply border-2 border-gray-900;
  }
}
</style>
