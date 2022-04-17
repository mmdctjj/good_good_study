import { reactivity, ref } from './reactivity/index'

const state = new reactivity({
  name: '小明',
  age: 18,
  friends: [{
    name: '张三',
    age: 18
  }, {
    name: '李四',
    age: 19
  }]
})
state.name
state.friends[0]
const number = ref(1)
console.log(number.value)
number.value = ref('lll').value
console.log(number.value)