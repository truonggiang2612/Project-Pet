<script setup>
import axios from 'axios'
import { ref, computed, onMounted } from 'vue';
var url = "https://randomuser.me/api/?results=20"

const list = ref([]);
const prePage = ref(5);     // Số lượng item hiển thị là 5
const currentPage = ref(1)    // Mặc định đứng ở trang 1


// Call API lấy dữ liệu
const getUsers = () => {
  axios.get(url)
    .then(res => {
      console.log('res------>', res.data.results);
      list.value = res.data.results
    })
    .catch(err => {
      console.log(err);
    })
}

onMounted(() => {
  getUsers()
})


// Hàm chuyển trang
const changePage = (num) => {
  console.log('Số truyền vào là:', num);
  console.log('Trang hiện tại là:', currentPage.value);
  currentPage.value = currentPage.value + num   // Trang hiện tại + number
}


// Computed
const filteredList = computed(() => {
  const star = (currentPage.value - 1) * prePage.value
  const end = currentPage.value * prePage.value
  const result = list.value.slice(star, end)
  return result
})
</script>

<template>
  <div id="app">
    <div class="container">
      <div class="user" v-for="(user, index) in filteredList" :key="index">
        <img class="headshot" :src="user.picture.thumbnail" />
        <div class="text-wrapper">
          <h3>
            {{ user.name.title }} {{ user.name.first }} {{ user.name.last }}
          </h3>
          <p>
            {{ user.email }}
          </p>
          <p>
            {{ user.phone }}
          </p>
        </div>
      </div>

      <div class="btn-wrapper">
        <button class="btn" :disabled="currentPage === 1" @click="changePage(-1)">Prev</button>

        <button class="btn" :disabled="currentPage === 1" @click="changePage(0)">1</button>   <!--Cả 3 button đang bị lỗi-->
        <button class="btn" :disabled="currentPage === 2" @click="changePage(1)">2</button>   <!--Cả 3 button đang bị lỗi-->
        <button class="btn" :disabled="currentPage === 3" @click="changePage(2)">3</button>   <!--Cả 3 button đang bị lỗi-->

        <button class="btn" :disabled="currentPage === 4" @click="changePage(1)">Next</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.btn-wrapper {
  margin: 20px;
}

.user {
  width: 400px;
  padding: 20px 40px;
  display: flex;
  align-items: center;
  box-shadow: 2px 2px 8px #bfbfbf;
  border-radius: 4px;
  margin-bottom: 10px;
}

.headshot {
  height: 80px;
  width: 80px;
  border-radius: 50%;
  margin-right: 50px;
}

h3 {
  margin-top: 0;
}

p {
  margin: 2px;
}

.btn {
  color: white;
  font-size: 20px;
  font-weight: 700;
  background-color: #ffa2a2;
  border: none;
  padding: 10px 26px;
  border-radius: 22px;
  cursor: pointer;
  margin: 0 50px;
}

.btn:hover {
  background-color: #fdadad;
}

.btn:focus {
  outline: none;
}

.btn:active {
  background-color: #ef8c8c;
}

.btn:disabled {
  background: #dddddd;
}
</style>
