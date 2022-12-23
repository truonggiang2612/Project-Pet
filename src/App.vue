<script setup>
import FakeStoreApi from './components/FakeStoreApi.vue';
import SliderProduct from './components/SliderProduct.vue';
</script>

<template>
  <div class="container-app">
    <div class="slider-wrapper">
      <SliderProduct/>
    </div>
    <div>
      <FakeStoreApi/>
    </div>
  </div>
</template>

<style scoped>
.container-app {
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
}
.slider-wrapper {
  height: auto;
  margin: 20px auto;
}
</style>

