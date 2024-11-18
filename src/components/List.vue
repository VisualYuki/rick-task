<template>
  <ul>
    <li v-for="item in state.hidden ? 2 : 10">
      <template v-if="state.list">
        <a :href="state.list[item]" alt=""> {{ state.list[item] }} </a>
      </template>
    </li>
    <button v-if="state.hidden" @click="state.hidden = false">show more</button>
    <button v-else @click="state.hidden = true">hide</button>
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
  list: find(commonStore.characterApiData, ['id', props.id])?.episode,
})
</script>

<style lang="scss" scoped>
ul {
  display: block;
}
</style>
