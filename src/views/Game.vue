<template>
  <div>
    <div class="card-wrap">
      <template v-for="cardCharacter in commonStore.cardCharacters" :key="cardCharacter.id">
        <Card v-if="!cardCharacter.completed" :id="cardCharacter.id"> </Card>
      </template>
    </div>

    <div class="card-wrap">
      <template v-for="targetCharacter in commonStore.targetCharacters">
        <Target v-if="!targetCharacter.completed" :id="targetCharacter.id">
          {{ find(commonStore.characterApiData, ['id', targetCharacter.id])?.name }}
        </Target>
        <template v-else>
          <div>
            <Card :id="targetCharacter.id"></Card>
            <List :id="targetCharacter.id"></List>
          </div>
        </template>
      </template>
    </div>

    <div class="btn-wrap">
      <button @click="$router.push('/restart')" :disabled="!commonStore.isFinished">ready</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import Card from '../components/Card.vue'
import List from '../components/List.vue'
import Target from '../components/Target.vue'
import { useCommonStore } from '../store/common'
import { find } from 'lodash'

const commonStore = useCommonStore()

commonStore.initData()
</script>

<style scoped lang="scss">
.card-wrap {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 20px;
  margin-bottom: 50px;
}

.btn-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
