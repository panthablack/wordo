<script setup>
import MobileNav from '@/components/nav/MobileNav.vue'
import OffCanvasNav from '@/components/nav/OffCanvasNav.vue'
import StaticSidebar from '@/components/nav/StaticSidebar.vue'
import SunBanner from '@/components/nav/SunBanner.vue'

const emit = defineEmits(['toggle'])

const { open } = defineProps({ open: Boolean })

const showOffCanvasNav = false
const showSunBanner = true
const showStaticSidebar = false
const showMobileNav = false

const onToggle = () => {
  if (showStaticSidebar) emit('toggle')
}
</script>

<template>
  <header>
    <SunBanner v-if="showSunBanner" class="ml-5 absolute z-[100]" @clicked="onToggle" />
    <StaticSidebar v-if="showStaticSidebar" :open="open" />
    <OffCanvasNav v-if="showOffCanvasNav" />
    <MobileNav v-if="showMobileNav" />
  </header>
</template>
