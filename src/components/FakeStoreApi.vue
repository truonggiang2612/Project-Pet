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
        <ul class="product-item" v-for="(item, index) in products" :key="index">
            <li class="item-img">
                <img :src="item.image" alt="image" s>
            </li>
            <li class="item-title"><strong>{{ item.title }}</strong></li>
            <li><strong>Price:</strong> {{ item.price }}</li>
            <li><strong>Rate:</strong> {{ item.rating.rate }}</li>
        </ul>
    </div>
</template>

<style scoped>
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