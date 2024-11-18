<template>
  <ul>
    <template v-for="item in state.hidden ? 2 : 10" :key="item">
      <li v-if="state.list && state.list[item - 1] !== undefined">
        <a :href="state.list[item - 1]" alt=""> {{ state.list[item - 1] }} </a>
      </li>
    </template>

    <template v-if="state.list?.length > 2">
      <button v-if="state.hidden" @click="state.hidden = false">show more</button>
      <button v-else @click="state.hidden = true">hide</button>
    </template>
  </ul>
</template>

<script lang="ts" setup>
import { useCommonStore } from '@/store/common'
import { find } from 'lodash'
import { reactive, ref } from 'vue'

const props = defineProps({
  id: {
    type: Number,
    default: -1,
  },
})

const commonStore = useCommonStore()

const state = reactive({
  hidden: true,
  list: find(commonStore.characterApiData, ['id', props.id])?.episode as string[],
})

debugger
</script>

<style lang="scss" scoped>
ul {
  display: block;
}
</style>
