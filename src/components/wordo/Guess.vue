<script setup>
import Tile from '@/components/wordo/Tile.vue'
import { useLetterStore } from '@/stores/letterStore'
import { useWordoStore } from '@/stores/wordoStore'
import { computed } from 'vue'

const props = defineProps({ guess: { type: Object, required: true } })
const letterStore = useLetterStore()
const wordoStore = useWordoStore()
const thisGuessActive = computed(() => wordoStore.activeElements.guess.id === props.guess.id)
const submissionReady = computed(() => wordoStore.submissionReady && thisGuessActive.value)
const submissionReadyClasses = computed(() => (submissionReady.value ? 'submissionReady' : ''))

const letters = props.guess.letters.map(l => letterStore.letters[l])
</script>

<template>
  <div class="gameRow" :class="submissionReadyClasses">
    <Tile v-for="letter in letters" :key="`guess${guess.id}letter${letter.id}`" :letter="letter" />
  </div>
</template>

<style scoped lang="css">
.gameRow {
  @apply flex items-center justify-center gap-2 flex-nowrap;

  &.submissionReady .gameTile {
    @apply border-4;
  }
}
</style>
