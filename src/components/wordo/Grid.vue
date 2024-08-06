<script setup>
import Guess from '@/components/wordo/Guess.vue'
import { useGuessStore } from '@/stores/guessStore'
import { computed } from 'vue'

const props = defineProps({ board: Object })
const guessStore = useGuessStore()

const guesses = computed(() => props.board.guesses.map(g => guessStore.guesses[g]))
</script>

<template>
  <div class="gameGrid">
    <Guess v-for="guess in guesses" :key="`guess${guess.id}`" :guess="guess" />
  </div>
</template>

<style scoped lang="css">
.gameGrid {
  @apply grid place-items-center gap-y-2;
}
</style>
