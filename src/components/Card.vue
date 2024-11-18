<template>
  <div class="card" draggable="true" @dragstart="methods.handleDragStart">
    <img :src="props.image" alt="" />
    <div style="color: #c0c0c0">{{ props.name }}</div>
  </div>
</template>

<script lang="ts" setup>
import { useCommonStore } from '@/store/common'

const emit = defineEmits(['selected-name'])

const props = defineProps({
  image: {
    type: String,
    default: '',
  },
  name: {
    type: String,
    default: '',
  },
  id: {
    type: Number,
    default: -1,
  },
})

const commonStore = useCommonStore()

const methods = {
  handleDragStart(event: DragEvent) {
    commonStore.dragStartCharacterId = props.id

    //console.log('dragstart', event)
  },
}
</script>

<style lang="scss" scoped></style>
