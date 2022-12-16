<script setup>
import axios from 'axios';

const sortProduct = () => {
  let url = 'https://fakestoreapi.com/products?sort=desc'
  axios.get(url)
    .then(res => {
      console.log(res.data)
    })
    .catch(err => err)
}
</script>

<template>
  <div class="container-sort">
    <button @click="sortProduct()">Sort</button>
  </div>
</template>

<style scoped>
.container-sort button {
  border: 1px solid #ccc;
  padding: 5px;
  border-radius: 3px;
  margin: 10px 0 0 10px;
  cursor: pointer;
}
</style>
