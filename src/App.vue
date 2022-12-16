<script setup>

import FakeStoreApi from './components/FakeStoreApi.vue';
// import SortProduct from './components/SortProduct.vue';

</script>

<template>
  <div class="container-app">
    <!-- <div class="sort-product">
      <SortProduct />
    </div> -->
    <div>
      <FakeStoreApi />
    </div>
  </div>
</template>

<style scoped>
.sort-product {
  width: 100%;
  border: 1px solid #ccc;
}
</style>

