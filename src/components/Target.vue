<template>
  <div
    class="target"
    :class="[{ target_success: state.isSuccess, target_error: state.isError }]"
    @dragover="methods.handleDragOver"
    @dragenter="methods.handleDragEnter"
    @dragleave="methods.handleDragLeave"
    @drop="methods.handleDrop"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import { useCommonStore } from '@/store/common'
import { find } from 'lodash'
import { reactive } from 'vue'

const props = defineProps({
  id: {
    type: Number,
    default: -1,
  },
})

const state = reactive({
  isError: false,
  isSuccess: false,
})

const commonStore = useCommonStore()

const methods = {
  handleDrop(event: DragEvent) {
    if (state.isSuccess) {
      let cardCharacter = find(commonStore.cardCharacters, ['id', props.id])
      let targetCharacter = find(commonStore.targetCharacters, ['id', props.id])

      if (cardCharacter) {
        cardCharacter.completed = true
      }

      if (targetCharacter) {
        targetCharacter.completed = true
      }
    }
  },
  handleDragOver(event: DragEvent) {
    event.preventDefault()
  },
  handleDragEnter(event: DragEvent) {
    debugger
    if (+commonStore.dragStartCharacterId === props.id) {
      state.isError = false
      state.isSuccess = true
    } else {
      state.isError = true
      state.isSuccess = false
    }
  },
  handleDragLeave(event: DragEvent) {
    state.isError = false
    state.isSuccess = false
  },
}
</script>

<style lang="scss" scoped>
.target {
  width: 300px;
  height: 300px;

  border: 1px dashed gray;

  &_error {
    border: 1px solid red;
  }

  &_success {
    border: 1px solid green;
  }
}
</style>
