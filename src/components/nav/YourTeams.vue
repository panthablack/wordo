<template>
  <li>
    <div class="text-xs font-semibold leading-6 text-gray-400">Your teams</div>
    <ul role="list" class="-mx-2 mt-2 space-y-1">
      <li>
        <!-- Current: "bg-gray-800 text-white", Default: "text-gray-400 hover:text-white hover:bg-gray-800" -->
        <a
          href="#"
          class="group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-400 hover:bg-gray-800 hover:text-white"
        >
          <span
            class="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-gray-800 text-[0.625rem] font-medium text-gray-400 group-hover:text-white"
            >H</span
          >
          <span class="truncate">Heroicons</span>
        </a>
      </li>
      <li>
        <a
          href="#"
          class="group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-400 hover:bg-gray-800 hover:text-white"
        >
          <span
            class="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-gray-800 text-[0.625rem] font-medium text-gray-400 group-hover:text-white"
            >T</span
          >
          <span class="truncate">Tailwind Labs</span>
        </a>
      </li>
      <li>
        <a
          href="#"
          class="group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-400 hover:bg-gray-800 hover:text-white"
        >
          <span
            class="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-gray-800 text-[0.625rem] font-medium text-gray-400 group-hover:text-white"
            >W</span
          >
          <span class="truncate">Workcation</span>
        </a>
      </li>
    </ul>
  </li>
</template>
