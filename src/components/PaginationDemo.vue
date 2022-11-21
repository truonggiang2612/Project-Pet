<script setup>
import axios from 'axios'
import { ref, computed } from 'vue';
var url = "https://randomuser.me/api/?results=20"

const list = ref([]);
const prePage = ref(5);
const currentPage = ref(1)

onCreated(() => {
  this.getUsers()
})

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

const changePage = (num) => {
  console.log('number', num);
  console.log('currentPage', currentPage.value);
  currentPage.value = currentPage.value + num
}

const filteredList = computed(() => {
  const end = this.currentPage * this.prePage
  const result = this.list.slice(star, end)
  return result
})
//  computed: {
    //  filteredList() {
     // cu1 filter 0~5
      // cu2 filter 6~10
      // (x-1)*n  .. x * n
      // console.log('this.currentPage', this.currentPage)
      // const end = this.currentPage * this.prePage
    //  console.log(star, end)
      // console.log('computed', this.list)
      //  console.log('result', this.list.slice(star, end))
      //  const result = this.list.slice(star, end)
      //  return result
    // }

// export default {
//   data() {
//     return { 
//       list: [],
//       prePage: 5,
//       currentPage: 1
//     }
//   },
//   created: function(){
//     this.getUsers();
//   },

//   methods:{
//     getUsers() {
//       axios.get(url)
//         .then(res => {
//           console.log(res.data.results)
//           this.list = res.data.results
//         })
//         .catch(error => {
//           console.log(error)
//         })
//     },
//     changePage(num) {
//       console.log('num', num)
//       console.log('this.currentPage', this.currentPage)
//       this.currentPage = this.currentPage + num
//     }
//   },

//   computed: {
//     filteredList() {
//       // cu1 filter 0~5
//       // cu2 filter 6~10
//       // (x-1)*n  .. x * n
//       console.log('this.currentPage', this.currentPage)
//       const star = (this.currentPage - 1) * this.prePage
//       const end = this.currentPage * this.prePage
//       console.log(star, end)
//       console.log('computed', this.list)
//       console.log('result', this.list.slice(star, end))
//       const result = this.list.slice(star, end)
//       return result
//     }
// }
// }

</script>

<template>
<div id="app">
  <div class="container">
    <div class="btn-wrapper">
      <button class="btn" type="button" :disabled="currentPage === 1" @click="changePage(-1)">Prev</button>
      <button class="btn" type="button" :disabled="currentPage === 4" @click="changePage(1)">Next</button>
    </div>
    
    <div class="user" v-for="(user, index) in filteredList" :key="index">
      <img class="headshot" :src="user.picture.thumbnail" />
      <div class="text-wrapper">
        <h3>
          {{user.name.title}} {{user.name.first}} {{user.name.last}}
        </h3>
        <p>
          {{ user.email }}
        </p>
        <p>
          {{ user.phone }}
        </p>
      </div>
    </div> 
  </div>
</div>
</template>

<style scoped>
* {
  font-family: 微軟正黑體;
/*   border: 1px solid black; */
}

body {
  padding: 0;
}

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
/*   border: 1px solid black; */
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
  padding: 14px 28px;
  border-radius: 22px;
  cursor: pointer;
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
