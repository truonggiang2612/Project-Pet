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