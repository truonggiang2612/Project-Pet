<script setup>
import axios from 'axios'
import { ref, computed, onMounted } from 'vue';

var url = "https://jsonplaceholder.typicode.com/todos?_limit=10"

const lists = ref([]);
const totalItemShow = ref(5);     // Show item = 10
const currentPage = ref(1)    // Default page 1
const textValue = ref('')
const isShow = ref(false)
const selectedTask = ref(null)

// Get data
const getUsers = () => {
  axios.get(url)
    .then(res => {
      console.log('res------>', res.data);
      lists.value = res.data
    })
    .catch(err => {
      console.log(err);
    })
}

onMounted(() => {
  getUsers()
})

// Post data
const postData = () => {
  if (textValue.value && textValue.value.trim()) {
    axios.post(url, { title: textValue.value })
      .then(res => {
        lists.value.unshift(res.data)
        textValue.value = ''
        isShow.value = true
        setTimeout(() => {
          isShow.value = false
        }, 2000)
      })
      .catch(err => {
        console.log(err);
      })
  } else {
    alert('Please enter value...')
    textValue.value = ''
  }
}

//Delete post
const deletePost = (index) => {
  let urlDelete = "https://jsonplaceholder.typicode.com/posts/${index}"
  axios.delete(urlDelete)
    .then(res => {
      console.log(res);
      lists.value.splice(index, 1)
    })
    .catch(err => {
      console.log('Co loi =>', err);
    })
}


// Edit data
const EditPost = (id) => {
  let urlEdit = `https://jsonplaceholder.typicode.com/posts/${id}`
  axios.put(urlEdit)
    .then(res => {
      console.log(res);
      selectedTask.value = lists.value.find(item => item.id === id)
    })
    .catch(err => {
      console.log(err);
    })
}

// Update 
// const updateTask = (data) => {
//   if (!data || !data.id) {
//     return;
//   }
//   lists.value.forEach(item => {
//     if (item.id === data.id) {
//       item.name = data.name;
//       return;
//     }
//   })
//   selectedTask.value = null
// }

// Change page
const changePage = (num) => {
  currentPage.value = currentPage.value + num
}


// Computed
const filteredList = computed(() => {
  const star = (currentPage.value - 1) * totalItemShow.value
  const end = currentPage.value * totalItemShow.value
  const result = lists.value.slice(star, end)
  return result
})
</script>

<template>
  <div class="flex flex-col justify-center">
    <div class="flex justify-start items-center mb-[20px] sm:mt-[100px]">
      <input v-model="textValue" type="text"
        class="border-2 h-[30px] rounded mr-[20px] w-[200px] shadow-[0_5px_10px_5px_rgba(0,0,0,0.3)] md:w-[300px] md:h-[40px]">
      <button @click="postData"
        class="border-2 p-[2px] rounded active:bg-[#0000ff] shadow-[0_5px_10px_5px_rgba(0,0,0,0.3)] md:p-[6px]">Add</button>
      <p v-if="isShow" class="absolute w-[110px] border-2 p-[5px] rounded-[10px] bg-[#FFFFF] shadow-[0_5px_10px_10px_rgba(0,255,255,0.3)] right-[5px] ml-[200px] mb-[70px] text-[10px] text-blue-600
          md:w-[200px] md:h-[50px] md:text-center md:leading-[35px] md:text-[16px] md:mt-[70px] md:mr-[60px]
          lg:mr-[150px]
          xl:mr-[250px]
          2xl:mr-[500px]
          ">Added successfully!</p>
    </div>

    <div class="mb-[10px]" v-for="(user, index) in filteredList" :key="index">
      <div class="w-full">
        <h3 class="text-[14px] md:text-[16px]">
          <strong>id:</strong> {{ user.id }}
        </h3>
        <p class="text-[14px] md:text-[16px]">
          <strong>title:</strong> {{ user.title }}
        </p>
        <button @click="deletePost(index)"
          class="border-2 rounded p-[2px] text-[14px] active:bg-[#ff0000] shadow-[0_5px_10px_5px_rgba(0,0,0,0.3)] md:p-[2px] mr-[10px]">Delete</button>
        <button @click="EditPost(id)"
          class="border-2 rounded p-[2px] text-[14px] active:bg-[#ff0000] shadow-[0_5px_10px_5px_rgba(0,0,0,0.3)] md:p-[2px]">Edit</button>
      </div>
    </div>

    <div class="w-50% flex justify-center items-center mt-[20px]">
      <button
        class="border-2 p-[4px] rounded-[50%] mr-[30px] hover:bg-[#ffcdd2] active:bg-[#f44336] active:border-[#000] md:p-[6px]"
        :disabled="currentPage === 1" @click="changePage(-1)">Prev</button>
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
          class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3" />
        </svg>
      </div>
      <button
        class="border-2 p-[4px] rounded-[50%] ml-[30px] hover:bg-[#ffcdd2] active:bg-[#f44336] active:border-[#000] md:p-[6px]"
        :disabled="currentPage === 10" @click="changePage(1)">Next</button>
    </div>
  </div>
</template>

