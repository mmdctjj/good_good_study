// 存放跟踪的副作用
const effectStack = []
// 激活的副作用
const activeEffect

// 副作用入口
export function effect (fn, option) {
  if (fn && fn._isEffect === true) fn = fn.raw
  const effect = createReactivityEffect(fn, option)
  if (!option.lazy) effect()
  return effect
}

let uid = 0

// 创建响应式的副作用
export function createReactivityEffect (fn, option) {
  const effect = function reactivityEffect () {
    if (!effect.active) {
      return option.scheduler ? undefined : fn()
    }
    if (!effectStack.includes(effect)) {
      cleanUp(effect)
      try {
        if (!effect.includes(effect)) {
          effectStack.push(effect)   
        }
      } finally {
        
      }
    }
  }
  effect.id = uid ++
  effect._isEffect = true
  effect.active = true
  effect.raw = fn
  effect.deps = []
  effect.option = option
  return effect
}

// 停止副作用
export function stop () {}

// 清除副作用
export function cleanUp () {}

// 副作用触发器
export function trigger () {}

// 副作用跟踪器
export function stack () {}