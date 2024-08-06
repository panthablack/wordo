<script setup>
import NavBar from '@/components/nav/NavBar.vue'
import { computed, ref } from 'vue'
import { RouterView } from 'vue-router'

const showNav = ref(true)
const navOpen = ref(false)
const mainClasses = computed(() => (navOpen.value && showNav.value ? 'lg:pl-72' : 'm-auto px-0'))
</script>

<template>
  <div class="defaultLayout">
    <NavBar v-if="showNav" :open="navOpen" @toggle="navOpen = !navOpen" />
    <main class="py-10 bg-slate-200" :class="mainClasses">
      <div class="mainSubContainer px-4 sm:px-6 lg:px-8">
        <RouterView />
      </div>
    </main>
  </div>
</template>

<style scoped lang="css">
.defaultLayout,
.mainSubContainer,
main {
  @apply h-full;
}
</style>
