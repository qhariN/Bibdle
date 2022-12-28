import type { Letter } from 'src/interfaces/letter'
import { derived, writable, type Readable, type Writable } from 'svelte/store'

export const view: Writable<'welcome' | 'board' | 'result' | 'help'> = writable('board')

export const words: Writable<Letter[][] | undefined[][]> = writable([])

export const gameWon: Readable<boolean> = derived(words, $words => {
  return $words.some(word => word[0] && word.every(l => l.matched))
})

export const gameOver: Readable<boolean> = derived(words, $words => {
  return $words.every(word => word[0])
})