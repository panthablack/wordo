<script setup>
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

const props = defineProps({
  disabled: { type: Boolean },
  icon: { type: Object },
  to: { type: String, required: true },
})

const route = useRoute()

const active = computed(() => route.path === props.to)

const DISABLED_CLASSES =
  'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-600 cursor-default'
const DEFAULT_LIST_CLASSES = 'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6'
const ACTIVE_CLASSES = 'bg-gray-800 text-white'
const INACTIVE_CLASSES = 'text-gray-400 hover:text-white hover:bg-gray-700'

const linkClasses = computed(() => {
  if (props.disabled) return DISABLED_CLASSES
  else if (active.value) return `${DEFAULT_LIST_CLASSES} ${ACTIVE_CLASSES}`
  else return `${DEFAULT_LIST_CLASSES} ${INACTIVE_CLASSES}`
})
</script>

<template>
  <RouterLink :to="disabled ? '#' : to" :class="linkClasses" :disabled="disabled">
    <component v-if="icon" :is="icon" />
    <slot />
  </RouterLink>
</template>
