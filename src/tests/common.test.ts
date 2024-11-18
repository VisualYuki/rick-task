import { mount } from '@vue/test-utils'
import { expect, it, describe, beforeEach } from 'vitest'
import Card from '@/components/Card.vue'
import Target from '@/components/Target.vue'
import { vi } from 'vitest'
import { useCommonStore } from '@/store/common'
import { createTestingPinia } from '@pinia/testing'
import App from '@/App.vue'

describe('common', () => {
  it('default', async () => {
    let wrapper = mount(App, {
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
    const commonStore = useCommonStore()
    const cards = wrapper.findAllComponents(Card)
    const targets = wrapper.findAllComponents(Target)

    await cards[0].trigger('dragstart')
    await targets[0].trigger('dragenter')

    expect(targets[0].classes()).toContain('target_error')
    expect(targets[0].classes()).not.toContain('target_success')

    await targets[0].trigger('dragleave')

    expect(targets[0].classes()).not.toContain('target_error')
    expect(targets[0].classes()).not.toContain('target_success')

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
