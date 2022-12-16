<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';

const products = ref([])
const errors = ref([])

//Get all products
const getProducts = async () => {
    let url = 'https://fakestoreapi.com/products'
    await axios.get(url)
        .then(res => {
            products.value = res.data
        })
        .catch(err => {
            console.log('err', err);
            errors.value.push(err)
        })
        .finally(() => {
            console.log("OK");
        })
}

// Sort products - GIÁ TĂNG GIẢM
const increasePrice = () => {
    let increasePrice = products.value.sort((a,b) => a.price - b.price);
    products.value = increasePrice;
}

const decreasePrice = () => {
    let decreasePrice = products.value.sort((a,b) => b.price - a.price);
    products.value = decreasePrice;
}

onMounted(() => getProducts())
</script>

<template>
    <div class="container-sort">
        <button @click="getProducts()">Default</button>
        <button @click="increasePrice()">Increase Price</button>
        <button @click="decreasePrice()">Decrease Price</button>
    </div>
    <div class="container-store">
        <ul class="product-item" v-for="item in products" :key="item.id">
            <li class="item-img">
                <img :src="item.image" alt="image">
            </li>
            <li class="item-title"><strong>{{ item.title }}</strong></li>
            <li><strong>Price:</strong> {{ item.price }} $</li>
            <li><strong>Rate:</strong> {{ item.rating.rate }}</li>
        </ul>
    </div>
</template>

<style scoped>
.container-sort button {
    border: 1px solid #ccc;
    padding: 0 5px;
    border-radius: 3px;
    margin: 10px 0 0 10px;
    cursor: pointer;
}

.container-store {
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    margin-top: 100px;
}

.product-item {
    border: 1px solid #ccc;
    border-radius: 10px;
    width: 300px;
    height: 300px;
    margin-right: 20px;
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: 5px 5px 5px #ccc;
}

.item-title {
    margin: 10px
}

.item-img {
    margin-top: 10px;
    width: 150px;
    height: 120px;
}

.item-img img {
    max-width: 150px;
    max-height: 120px;
}
</style>