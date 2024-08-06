<script setup>
const emits = defineEmits(['clicked'])
</script>

<template>
  <button class="flex h-20 shrink-0 items-center" @click="emits('clicked')">
    <img class="h-12 w-auto" src="@/assets/icons/sun.svg" alt="Logo" />
  </button>
</template>
