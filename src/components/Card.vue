<template>
  <div class="card" draggable="true" @dragstart="methods.handleDragStart">
    <img :src="state.data.image" alt="" />
    <div style="color: #c0c0c0">{{ state.data.name }}</div>
  </div>
</template>

<script lang="ts" setup>
import { useCommonStore } from '@/store/common'
import type { Character } from '@/types'
import { find } from 'lodash'
import { reactive } from 'vue'

const emit = defineEmits(['selected-name'])

const props = defineProps({
  id: {
    type: Number,
    default: -1,
  },
})

const commonStore = useCommonStore()

const state = reactive({
  data: find(commonStore.characterApiData, ['id', props.id]) as Character,
})

const methods = {
  handleDragStart(event: DragEvent) {
    commonStore.dragStartCharacterId = props.id
  },
}
</script>

<style lang="scss" scoped></style>
