<script setup>
import PrimaryButton from '@/components/buttons/PrimaryButton.vue'
import Grid from '@/components/wordo/Grid.vue'
import Keyboard from '@/components/wordo/Keyboard.vue'
import { START_NEW_GAME_ON_LOAD } from '@/config/wordo'
import { useGuessStore } from '@/stores/guessStore'
import { useWordoStore } from '@/stores/wordoStore'
import { KEYBOARD_KEY_TYPES } from '@/utilities/constants'
import { watchAlphaKeys } from '@/utilities/watchAlphaKeys'
import { onKeyStroke } from '@vueuse/core'
import { onMounted, ref } from 'vue'
import { computed } from 'vue'

// get wordo store interface
const wordoStore = useWordoStore()
const guessStore = useGuessStore()

const activeBoard = computed(() => wordoStore.activeElements.board)
const activeGame = computed(() => wordoStore.activeElements.game)
const showStartButton = computed(() => activeGame.value.finished)

// set up keyboard handlers and watchers
const onAlphaKeyPress = e => wordoStore.onLetterSelected(e)
const onEnterPressed = () => wordoStore.submitGuess()
const onBackspacePressed = () => guessStore.deleteLetter()
watchAlphaKeys(onAlphaKeyPress)
onKeyStroke('Enter', onEnterPressed)
onKeyStroke('Backspace', onBackspacePressed)
onKeyStroke('Delete', onBackspacePressed)

const onKeyClicked = e => {
  if (e.type === KEYBOARD_KEY_TYPES.ALPHABET) wordoStore.onLetterSelected(e.name)
  else if (e.type === KEYBOARD_KEY_TYPES.ENTER) onEnterPressed()
  else if (e.type === KEYBOARD_KEY_TYPES.DELETE) onBackspacePressed()
}

// start new game
const startNewGame = () => wordoStore.startNewGame()
if (START_NEW_GAME_ON_LOAD) startNewGame()

// autofocus main element
const wordoContainer = ref(null)
onMounted(() => {
  wordoContainer.value.focus()
})
</script>

<template>
  <div class="wordoContainer flex flex-col gap-y-4" ref="wordoContainer">
    <Transition name="fade-in-only">
      <PrimaryButton @click="startNewGame" v-if="showStartButton">Start New Game</PrimaryButton>
    </Transition>
    <div
      class="gameBoardContainer flex flex-col gap-x-12 gap-y-4 lg:flex-row items-center justify-center w-full"
    >
      <Keyboard :board="activeBoard" @keyClicked="onKeyClicked" />
      <Grid :board="activeBoard" v-if="activeGame && activeBoard" />
    </div>
  </div>
</template>

<style scoped lang="css">
.wordoContainer {
  @apply h-full flex items-center justify-center;
}
</style>
