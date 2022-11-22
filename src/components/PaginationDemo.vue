<script setup>
import axios from 'axios'
import { ref, computed, onMounted } from 'vue';
var url = "https://jsonplaceholder.typicode.com/posts"

const list = ref([]);
const totalItemShow = ref(10);     // Show item = 10
const currentPage = ref(1)    // Default page 1


// Call API get data
const getUsers = () => {
  axios.get(url)
    .then(res => {
      console.log('res------>', res.data);
      list.value = res.data
    })
    .catch(err => {
      console.log(err);
    })
}

onMounted(() => {
  getUsers()
})


// Change page
const changePage = (num) => {
  console.log('Số truyền vào là:', num);
  console.log('Trang hiện tại là:', currentPage.value);
  currentPage.value = currentPage.value + num   // Trang hiện tại + number
}


// Computed
const filteredList = computed(() => {
  const star = (currentPage.value - 1) * totalItemShow.value
  const end = currentPage.value * totalItemShow.value
  const result = list.value.slice(star, end)
  return result
})
</script>

<template>
    <div class="flex flex-col justify-center">
      <div class="mb-[10px]" v-for="(user, index) in filteredList" :key="index">
        <div class="text-wrapper">
          <h3>
            <strong>id:</strong> {{ user.id }}
          </h3>
          <p>
            <strong>title:</strong> {{ user.title }}
          </p>
        </div>
      </div>

      <div class="w-[50%] flex justify-center items-center mt-[20px]">
        <button class="border-2 p-[8px] rounded-[50%] mr-[50px] hover:bg-[#ffcdd2] active:bg-[#f44336] active:border-[#000]" :disabled="currentPage === 1" @click="changePage(-1)">Prev</button>
        <button class="border-2 p-[8px] rounded-[50%] mr-[50px] hover:bg-[#ffcdd2] active:bg-[#f44336] active:border-[#000]" :disabled="currentPage === 10" @click="changePage(1)">Next</button>
      </div>
    </div>
</template>
