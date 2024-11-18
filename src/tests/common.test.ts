import { mount } from '@vue/test-utils'
import { expect, it, describe, beforeEach } from 'vitest'
import Card from '@/components/Card.vue'
import Target from '@/components/Target.vue'
import { vi } from 'vitest'
import { useCommonStore } from '@/store/common'
import { createTestingPinia } from '@pinia/testing'
import App from '@/App.vue'
import Game from '@/views/Game.vue'

let wrapper = undefined
let cards = undefined
let targets = undefined

describe('common', () => {
  beforeEach(() => {
    wrapper = mount(Game, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
            initialState: {
              common: {
                characterApiData: [
                  { id: 1, name: 'name 1', image: 'image url 1', episode: ['1', '2', '3'] },
                  { id: 2, name: 'name 2', image: 'image url 2', episode: ['1', '2', '3'] },
                ],
                cardCharacters: [
                  { id: 1, completed: false },
                  { id: 2, completed: false },
                ],
                targetCharacters: [
                  { id: 2, completed: false },
                  { id: 1, completed: false },
                ],
              },
            },
          }),
        ],
      },
    })

    cards = wrapper.findAllComponents(Card)
    targets = wrapper.findAllComponents(Target)
  })

  it('error draggable', async () => {
    await cards[0].trigger('dragstart')
    await targets[0].trigger('dragenter')

    expect(targets[0].classes()).toContain('target_error')
    expect(targets[0].classes()).not.toContain('target_success')

    await targets[0].trigger('dragleave')

    expect(targets[0].classes()).not.toContain('target_error')
    expect(targets[0].classes()).not.toContain('target_success')
  })

  it('completed game', async () => {
    const commonStore = useCommonStore()

    await cards[0].trigger('dragstart')
    await targets[1].trigger('dragenter')
    await targets[1].trigger('drop')

    expect(targets[1].classes()).toContain('target_success')
    expect(targets[1].classes()).not.toContain('target_error')

    await cards[1].trigger('dragstart')
    await targets[0].trigger('dragenter')

    expect(targets[0].classes()).toContain('target_success')
    expect(targets[0].classes()).not.toContain('target_error')
    await targets[0].trigger('drop')

    expect(commonStore.isFinished).toBe(true)
  })
})
