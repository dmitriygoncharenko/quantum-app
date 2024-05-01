<template>
<div class="view__home-index">
  <ul>
    <li
        v-for="(item, key) in randomList"
        :key="key"
        :ref="el => setRef(el, key)"
    >
      <randomiser v-if="item.active"/>
    </li>
  </ul>
</div>
</template>
<script setup lang="ts">
import {ref,  onMounted, onUnmounted} from "vue";
const randomList = ref(
    Array.from(Array(Math.round((Math.random() * 100) + 100)).keys())
        .map(() => ({active: false}))
)


const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const index = entry.target.dataset.index;
    randomList.value[index].active = entry.isIntersecting;
  });
}, { threshold: 0.1 });

const setRef = (el: any, index: number) => {
  if (el) {
    el.dataset.index = index;
    observer.observe(el);
  }
};

onMounted(() => {
  randomList.value.forEach((item, index) => {
    if (item.$el) {
      setRef(item.$el, index);
    }
  });
});

onUnmounted(() => {
  observer.disconnect();
});

</script>
<style scoped lang="scss">
.view__home-index{
  ul{
    list-style: none;
    display: grid;
    gap: 10px;
    padding: 0;
    li{
      height: 52px;
    }
  }
}
</style>