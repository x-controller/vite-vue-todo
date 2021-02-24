<template>
  <div>注册</div>

  <label>
    <input type="text" v-model="form.username" placeholder="username">
  </label>

  <label>
    <input type="password" v-model="form.password" placeholder="password">
  </label>

  <label>
    <input type="password" v-model="form.confirm" placeholder="confirm password">
  </label>

  <button @click="onRegister">注册</button>
  <button @click="$router.push({name:'register'})">已有账号现在登录</button>

  <div v-if="errMsgRef" class="errMsg">{{ errMsgRef }}</div>
</template>

<script setup>
/**
 *  reactive 适用于页面双向绑定
 *  ref 适用于页面数据赋值
 */
import {reactive, ref} from "vue";
import {useRouter} from 'vue-router'
import tool from "../base/tool";


const router = useRouter()

const errMsgRef = ref("")

const form = reactive({username: '', password: '', confirm: ''})

const onRegister = async () => {
  if (!form.username || !form.password) {
    errMsgRef.value = "请输入完整的注册信息"
    return
  }
  const data = tool.request("register", 'POST', form)
  if (data.code === 0) {
    localStorage.setItem('token', data.token)
    this.$store.commit('setUser', data.user)
    await router.push({name: 'home'})
  } else {
    errMsgRef.value = '注册失败:' + data.msg
  }
}
</script>

<style scoped>

</style>
