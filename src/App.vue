<template>
  <div>
    <div class="card-wrap" style="margin-bottom: 100px">
      <template v-for="cardCharacter in commonStore.cardCharacters" :key="cardCharacter.id">
        <Card
          v-if="!cardCharacter.completed"
          :image="find(commonStore.characterApiData, ['id', cardCharacter.id])?.image"
          :name="find(commonStore.characterApiData, ['id', cardCharacter.id])?.name"
          :id="find(commonStore.characterApiData, ['id', cardCharacter.id])?.id"
        >
        </Card>
      </template>
    </div>

    <div class="card-wrap">
      <template v-for="targetCharacter in commonStore.targetCharacters">
        <Target
          v-if="!targetCharacter.completed"
          :id="find(commonStore.characterApiData, ['id', targetCharacter.id])?.id"
        >
          {{ find(commonStore.characterApiData, ['id', targetCharacter.id])?.name }}
        </Target>
        <template v-else>
          <div>
            <Card
              :image="find(commonStore.characterApiData, ['id', targetCharacter.id])?.image"
              :name="find(commonStore.characterApiData, ['id', targetCharacter.id])?.name"
              :id="find(commonStore.characterApiData, ['id', targetCharacter.id])?.id"
            ></Card>
            <List :id="find(commonStore.characterApiData, ['id', targetCharacter.id])?.id"></List>
          </div>
        </template>
      </template>
    </div>

    <button @click="commonStore.initData()" :disabled="!commonStore.isFinished">again</button>
  </div>
</template>

<script setup lang="ts">
import Card from './components/Card.vue'
import List from './components/List.vue'
import Target from './components/Target.vue'
import { useCommonStore } from './store/common'
import { find } from 'lodash'

const commonStore = useCommonStore()

commonStore.initData()
</script>

<style scoped lang="scss">
.card-wrap {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 20px;
}
</style>
