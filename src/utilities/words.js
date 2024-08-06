import { solutionWords } from '@/data/wordo/svelte-list'

export const getRandomWord = () => solutionWords[Math.floor(Math.random() * solutionWords.length)]
