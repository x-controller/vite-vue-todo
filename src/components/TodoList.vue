<template>
  <div class="msg">{{ msgRef }}</div>
  <div class="todo">
    <div class="todo-form">
      <div class="todo-input">
        <label>
          <input @keyup.enter="onSave" v-model="contentRef" type="text" placeholder="请输入事项内容"/>
        </label>
      </div>
      <button type="button" @click="onSave">添加事项</button>
    </div>
    <ul class="list" v-if="listRev.length">
      <li class="list-item" v-for="(item,index) of listRev" :id="item.id" :key="item.id">
        <div class="item-label" :class="item.status?'done':''">{{ item.title }}</div>
        <div class="action-btn">
          <button class="success" v-if="!item.status" @click="onChange(index,true)">完成</button>
          <button class="reset" v-if="item.status" @click="onChange(index,false)">激活</button>
          <button class="delete" @click="onRemove(index)">删除</button>
        </div>
      </li>
    </ul>
    <p v-else>暂无待办事项..</p>
  </div>
</template>

<script setup>
/**
 *  reactive
 *
 *  用于获取一个对象的响应性代理对象,等价于 Vue.observable () API，
 *  经过reactive处理后的函数能变成响应式的数据，某种程度来说，类似于option api里面的data属性的值.
 */

/**
 *  ref
 *
 *  将给定的值创建一个响应式的数据对象.
 *  需要使用.value才行进行取值和赋值操作.
 */

/**
 *   ref 是把值类型添加一层包装，使其变成响应式的引用类型的值。
 *   reactive 是引用类型的值变成响应式的值
 *
 */


import {computed, reactive, ref, watchEffect, onMounted} from "vue";
import {useStore} from "vuex";
import tool from "../base/tool";

/**
 *  setup
 *
 *  在 beforeCreate之后 created之前执行.
 *  函数只执行一次，但后续对于数据的更新也依旧可以驱动视图更新.
 * 接收参数：props(组件参数)、context(上下文对象).
 *
 * setup(props,context){
 *  context.slots
 *  context.emit
 *  context.refs
 * }
 *
 */

/**
 *  computed(计算属性)
 *  依赖于其他状态的状态
 *
 *  const state = reactive({
 *   count: 0,
 *   plusOne: computed(() => state.count + 1)
 * })
 *
 *
 *
 *  创建可读可写的计算属性
 *
 *  const count = ref(1)
 *  const computedCount = computed({
 *  get: () => count.value + 1,
 *  set: (val) => count.value = val - 1
 *  })
 *
 */

onMounted(() => {
  fetchTodos()
})


let listRev = reactive([])


const fetchTodos = async () => {
  const data = await tool.request('todos', 'GET')
  if (data.code === 0) listRev = data.data
}


let contentRef = ref(null)
let idRef = ref(0)
let msgRef = ref("")

const onSave = async () => {
  if (!contentRef.value) {
    msgRef.value = "请输入事项内容"
    return
  }
  if (listRev.find((item) => item.title === contentRef.value)) {
    msgRef.value = "该事项已存在，请输入其他事项吧~"
    return
  }
  const data = await tool.request('save-todo', 'POST', {title: contentRef.value})
  if (data.code === 0) {
    listRev.push({
      title: contentRef.value,
      id: ++idRef.value,
      status: false,
    })
    contentRef.value = ""
  } else {
    msgRef.value = data.msg
  }
}


const onChange = async (index, status) => {
  const id = listRev[index].id
  const data = await tool.request('save-change', 'POST', {id})
  if (data.code === 0) {
    listRev[index].status = status;
  } else {
    msgRef.value = data.msg
  }
}


const onRemove = async (index) => {
  const id = listRev[index].id
  const data = await tool.request('save-remove', 'POST', {id})
  if (data.code === 0) {
    listRev.splice(index, 1);
  } else {
    msgRef.value = data.msg
  }
}

const count = ref(0);
const add = () => count.value++;

/**
 *  副作用函数,在响应式数据发生变化时调用
 */
watchEffect(() => {
  msgRef.value = "contentRef changed" + contentRef.value
})

</script>

<style lang="scss">
button {
  border-width: 0;
  border-radius: 3px;
  background: #1e90ff;
  cursor: pointer;
  outline: none;
  color: white;
  font-size: 14px;
}

.todo {
  padding: 5vw;

  .todo-form {
    display: flex;
    justify-content: space-between;

    .todo-input {
      width: 75%;
      text-align: left;

      input {
        width: 100%;
        border: 1px solid #ccc;
        padding: 10px 0;
        border-radius: 3px;
        box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
        transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
      }

      input:focus {
        border-color: #66afe9;
        outline: 0;
        box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
        0 0 8px rgba(102, 175, 233, 0.6);
      }
    }

    button {
      width: 20%;
      font-size: 12px;
    }

    button:active {
      background: #5599ff;
    }
  }

  .list {
    text-align: left;
    vertical-align: top;
    background: #fff;
    color: rgb(30, 144, 255);
    border-radius: 5px;
    padding: 1em;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);
    margin-top: 30px;

    .list-item {
      list-style: none;
      padding: 10px 0;
      border-bottom: 1px solid #eee;
      display: flex;
      justify-content: space-between;

      .item-label {
        width: 80%;
      }

      .action-btn {
        width: 15%;

        button {
          margin: 0 3px 5px;
          font-size: 12px;
          padding: 3px 7px;
        }

        .success {
          background-color: #009688;
        }

        .delete {
          background-color: #e91e63;
        }

        .reset {
          background-color: #03a9f4;
        }
      }
    }

    .list-item:last-of-type {
      border-bottom: none;
    }

    .done {
      text-decoration: line-through;
      color: #ddd;
    }
  }
}
</style>
