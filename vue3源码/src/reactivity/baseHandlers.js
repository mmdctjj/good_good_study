import { reactivity } from './reactivity'

function createGetter () {
  return function (target, key, receiver) {
    let res = Reflect.get(target, key, receiver)
    // 验证代理是否成功
    console.log('get', target[key])
    // 如果访问的值还是是对象（包括数组），使用递归重新设置深层代理
    if (typeof target[key] === 'object' && target[key] !== null) {
      return reactivity(target[key])
    }
    return res
  }
}

function createSetter () {
  return function (target, key, value, receiver) {
    // 首先查看访问的属性是否存在
    // 1.如果是数组
    // 2.否则按对象处理
    const hasKey = Object.prototype.toString.call(target) === '[object Array]' && typeof key === 'number'
      ? key < target.length
      : target.hasOwnProperty(key),
      oldValue = target[key]
    let res = Reflect.set(target, key, value, receiver)
    if (!hasKey) {
      // 如果不存在则为新增属性
    } else {
      // 否则是设置新的值
    }
    // 验证代理是否成功
    console.log('set', key, value)
    return res
  }
}

const get = createGetter()
const set = createSetter()

const mutableHandlers = {
  get,
  set
}

export {
  mutableHandlers
}