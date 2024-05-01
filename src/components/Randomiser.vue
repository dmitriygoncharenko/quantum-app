<template>
  <div class="component__randomiser">
    <ul>
      <li v-for="(item, key) in numberQueue" :key="key" :class="{changed: key === changedIndex}">
        {{item}}
      </li>
    </ul>
  </div>
</template>
<script setup lang="ts">
import {reactive, ref, onMounted, onUnmounted} from 'vue';
const numberQueue = reactive<number[]>([])
const changedIndex = ref<number>()
let timer: NodeJS.Timeout;
const createRandomNumber = (min = 0, max = 100) => Math.floor(Math.random() * (max - min + 1)) + min;

onMounted(() => {
  const randomNumber = (Math.round(Math.random() * 10) + 10);
  for(let i = 0; i <= randomNumber; i++){
    numberQueue.push(createRandomNumber())
  }
  timer = setInterval(() => {
    changedIndex.value = createRandomNumber(0, numberQueue.length);
    numberQueue[changedIndex.value] = createRandomNumber()
  }, 1000)
})

onUnmounted(() => {
  clearTimeout(timer)
})

</script>
<style lang="scss">
@keyframes colorChange {
  0% { background-color: red; color: white; }
  100% { background-color: initial; color: initial; }
}
.component__randomiser{
  ul{
    display: flex;
    gap: 10px;
    align-items: center;
    justify-content: flex-start;
    padding: 0;
    li{
      cursor: pointer;
      list-style: none;
      border: 1px solid #eee;
      border-radius: 6px;
      width: 50px;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all .35s ease-in-out;
      &:hover{
        transform: scale(0.8);
      }
      &.changed{
        background-color: red;
        animation-name: colorChange;
        animation-duration: 1s;
        animation-timing-function: linear;
        animation-fill-mode: forwards;
        animation-iteration-count: infinite;
      }
    }
  }
}
</style>