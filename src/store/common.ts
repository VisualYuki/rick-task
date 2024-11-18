import { makeFetch } from '@/utils'
import { defineStore } from 'pinia'
import { random } from 'lodash'

export const useCommonStore = defineStore('common', {
  state: () => {
    return {
      characterApiData: [] as { id: number; name: string; image: string; episode: string[] }[],
      cardCharacters: [] as { id: number; completed: boolean }[],
      targetCharacters: [] as { id: number; completed: boolean }[],
      cardCount: 4,
      dragStartCharacterId: -1,
    }
  },
  actions: {
    initData() {
      ;`https://rickandmortyapi.com/api/character/${random(800)},${random(800)},${random(800)},${random(800)}`

      makeFetch(`https://rickandmortyapi.com/api/character/1,2,3,4`).then((response) => {
        this.characterApiData = response

        this.cardCharacters = this.characterApiData.map((item: Record<string, any>) => {
          return { id: item.id, completed: false }
        })

        this.targetCharacters = this.characterApiData.map((item: Record<string, any>) => {
          return { id: item.id, completed: false }
        })

        const SWAP_ITERATION_COUNT = 10

        for (let i = 0; i < SWAP_ITERATION_COUNT; i++) {
          let randomIdx1 = random(this.cardCount - 1)
          let randomIdx2 = random(this.cardCount - 1)

          let firstElement = this.targetCharacters[randomIdx1]
          let secondElement = this.targetCharacters[randomIdx2]

          this.targetCharacters[randomIdx1] = secondElement
          this.targetCharacters[randomIdx2] = firstElement
        }
      })
    },
  },
  getters: {
    isFinished(state) {
      return state.targetCharacters.every((item) => item.completed)
    },
  },
})