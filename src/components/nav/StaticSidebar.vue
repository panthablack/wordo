<script setup>
import HomeSvg from '@/assets/icons/nav/HomeSvg.vue'
import PeopleSvg from '@/assets/icons/nav/PeopleSvg.vue'
import NavLink from '@/components/nav/NavLink.vue'
import NavProfileSection from '@/components/nav/NavProfileSection.vue'
import YourTeams from '@/components/nav/YourTeams.vue'

const { open } = defineProps({ open: Boolean })

const showYourTeams = false
const showNavProfileSection = false
</script>

<template>
  <Transition name="slide-from-left">
    <div class="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col" v-if="open">
      <div class="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6">
        <nav class="flex flex-1 flex-col pt-20">
          <ul role="list" class="flex flex-1 flex-col gap-y-7">
            <li>
              <ul role="list" class="-mx-2 space-y-1">
                <li>
                  <NavLink to="/" :icon="HomeSvg">Wordo</NavLink>
                </li>
                <li>
                  <NavLink to="/profile" :icon="PeopleSvg" disabled>Profile</NavLink>
                </li>
              </ul>
            </li>
            <YourTeams v-if="showYourTeams" />
            <NavProfileSection v-if="showNavProfileSection" />
          </ul>
        </nav>
      </div>
    </div>
  </Transition>
</template>
