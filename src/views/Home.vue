<template>
  <!--
  <img alt="Vue logo" src="../assets/logo.png"/>
  <hello-world msg="Hello Vue 3 + Vite"/>
  -->
  <div v-if="!tokenRight">
    <button @click="$router.push({name:'login'})">登录</button>
  </div>
  <div v-else>
    <todo-list/>
  </div>
</template>

<script setup>
import HelloWorld from '../components/HelloWorld.vue'
import TodoList from '../components/TodoList.vue'
import {ref, onMounted} from "vue";
import tool from "../base/tool";

onMounted(async () => {
  await checkToken()
})

const tokenRight = ref(false)

const checkToken = async () => {
  const token = localStorage.getItem('token')
  const data = await tool.request("check-token", 'post', {token})
  if (data.code === 0) tokenRight.value = true
}


// This starter template is using Vue 3 experimental <script setup> SFCs
// Check out https://github.com/vuejs/rfcs/blob/script-setup-2/active-rfcs/0000-script-setup.md
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
