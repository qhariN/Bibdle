import type { Letter } from 'src/interfaces/letter'
import { derived, writable, type Readable, type Writable } from 'svelte/store'

export const view: Writable<'board' | 'result' | 'help'> = writable('board')

export const words: Writable<Letter[][] | undefined[][]> = writable([])

export const gameOver: Readable<boolean> = derived(words, $words => {
  return $words.every(word => typeof word[0] !== 'undefined')
})