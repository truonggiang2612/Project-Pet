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
        <div class="w-full">
          <h3>
            <strong>id:</strong> {{ user.id }}
          </h3>
          <p>
            <strong>title:</strong> {{ user.title }}
          </p>
        </div>
      </div>

      <div class="w-50% flex justify-center items-center mt-[20px]">
        <button class="border-2 p-[8px] rounded-[50%] mr-[30px] hover:bg-[#ffcdd2] active:bg-[#f44336] active:border-[#000]" :disabled="currentPage === 1" @click="changePage(-1)">Prev</button>
        <div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3" />
          </svg>
        </div>
        <button class="border-2 p-[8px] rounded-[50%] ml-[30px] hover:bg-[#ffcdd2] active:bg-[#f44336] active:border-[#000]" :disabled="currentPage === 10" @click="changePage(1)">Next</button>
      </div>
    </div>
</template>
