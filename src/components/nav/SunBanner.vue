<script setup lang="ts">
import SunButton from '@/components/nav/SunButton.vue'
import { useSunStore } from '@/stores/sunStore'

const sunStore = useSunStore()

const emits = defineEmits(['clicked'])

const onClick = () => {
  sunStore.sendMessage('Oooooh!  That tickles!')
  emits('clicked')
}
</script>

<template>
  <div class="sunBanner flex flex-nowrap items-center">
    <SunButton @clicked="onClick" />
    <Transition name="fade-in-only">
      <div class="sunMessage flex flex-nowrap items-start" v-if="sunStore.message">
        <span class="py-2">{{ sunStore.message }}</span>
        <div
          class="messageButtons flex flex-nowrap items-center relative bottom-1 left-2 ml-3 gap-1"
        >
          <button
            class="py-0 px-2 text-lg font-bold rounded-full hover:bg-amber-500 text-amber-600"
            @click="sunStore.closeMessage"
          >
            <div class="relative bottom-1">x</div>
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.sunMessage {
  @apply relative top-6 px-4 py-2 mx-4 rounded-xl rounded-tl-sm shadow-lg bg-amber-400 text-white font-semibold text-xl;
}
</style>
