<template>
  <label>
    <input type="text" v-model="form.username" placeholder="username">
  </label>

  <label>
    <input type="password" v-model="form.password" placeholder="password">
  </label>

  <button @click="onLogin">登录</button>
  <button @click="$router.push({name:'register'})">没有账号现在注册</button>

  <div v-if="errMsgRef.length" class="errMsg">{{ errMsgRef }}</div>
</template>

<script setup>
/**
 *  reactive 适用于页面双向绑定
 *  ref 适用于页面数据赋值
 */
import { reactive, ref} from "vue"
import tool from "../base/tool";
import {useRouter} from "vue-router";

const router = useRouter()

const errMsgRef = ref("")

const form = reactive({username: '', password: ''})


const onLogin = async () => {
  if (!form.username || !form.password) {
    errMsgRef.value = "请输入完整的登录信息"
    return
  }
  const data = await tool.request("login", 'post', form)
  if (data.code === 0) {
    localStorage.setItem('token',data.token)
    this.$store.commit('setUser', data.user)
    await router.push({name: 'home'})
  } else {
    errMsgRef.value = '登录失败:' + data.msg
  }
}
</script>

<style scoped>

</style>
