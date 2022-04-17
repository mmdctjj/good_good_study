export function ref (value) {
  return createRef(value)
}

function createRef (value) {
  // 如果已经是ref实例，则直接返回
  if (value.__v_isRef) return value
  return new RefImpl(value)
}

class RefImpl {
  constructor (value) {
    this._value = value
    // 只读属性：是否为ref类型
    this._v_isRef = true
  }
  get value () {
    return this._value
  }
  set value (newValue) {
    this._value = newValue
  }
  // 模拟只读属性
  get __v_isRef () {
    return this._v_isRef
  }
  set __v_isRef (__) {
    // 模拟的只读属性，如果设置新值，则不赋值
  }
}
