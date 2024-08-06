<script setup>
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import { useTitle } from '@vueuse/core'

useTitle(import.meta.env.VITE_APP_TITLE)
</script>

<template>
  <DefaultLayout />
</template>
