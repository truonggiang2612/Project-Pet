<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';

const products = ref([])
const errors = ref([])

const getProducts = () => {
    let url = 'https://fakestoreapi.com/products'
    axios.get(url)
            .then(res => {
                console.log('res -------->', res.data);
                products.value = res.data
            })
            .catch(err => {
                console.log('err', err);
                errors.value.push(err)
            })
}
onMounted(() => getProducts())
</script>

<template>
    <div class="container-store">
        <ul v-for="(item, index) in products" :key="index">
            <li>{{ item.title }}</li>
            <li>{{ item.price }}</li>
            <li>
                <img :src="item.image" alt="image" width="200" height="200">
            </li>
            <li>{{ item.rating }}</li>
        </ul>
    </div>
</template>

<style scoped>
.container-store {
    width: 100%;
    height: 100%;
    border: 1px solid #ccc;
    display: flex;
}
</style>