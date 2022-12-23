<!-- splidejs.com
 1. Doccument
2. Integration => Vue Splide
3. Installation => copy => terminal => Installation
4. Open main.js => lam theo muc Usage, import ca CSS
5. Example 
6. Link youtube: https://www.youtube.com/watch?v=VoxuiwR3fTk&t=649s -->

<script setup>
import { Splide, SplideSlide, SplideTrack } from '@splidejs/vue-splide';
import { ref } from 'vue';
import img1 from '@/assets/images/desktop-1.jpg'
import img2 from '@/assets/images/desktop-2.jpg'
import img3 from '@/assets/images/desktop-3.jpg'
import img4 from '@/assets/images/desktop-4.jpg'
import img5 from '@/assets/images/desktop-5.jpg'


const options = {
    rewind: true,
    gap: '1rem',
    autoplay: true,
};

const images = ref([
    { imgUrl: img1},
    { imgUrl: img2},
    { imgUrl: img3},
    { imgUrl: img4},
    { imgUrl: img5}
]);
</script>

<template>
    <div class="wrapper">
        <Splide aria-labelledby="autoplay-example-heading" :options="options" :has-track="false">
            <div style="position: relative">
                <SplideTrack>
                    <SplideSlide v-for="image, index in images" :key="index">
                        <img :src="image.imgUrl" :alt="image.alt">
                    </SplideSlide>
                </SplideTrack>
            </div>

            <!-- THANH TRƯỢT NGANG -->
            <div class="splide__progress">
                <div class="splide__progress__bar">
                </div>
            </div>

            <!-- OPTION Play & Pause -->
            <!-- <button class="splide__toggle">
                <span class="splide__toggle__play">Play</span>
                <span class="splide__toggle__pause">Pause</span>
            </button> -->
        </Splide>
    </div>
</template>

<style>
/*Inspect ngoài browser rồi tìm class */
.splide__slide img {
    width: 100%;
    height: 500px;
    object-fit: cover;
    display: block;
}
.splide__arrow--prev,
.splide__arrow--next {
    font-size: 2em;
}
</style>