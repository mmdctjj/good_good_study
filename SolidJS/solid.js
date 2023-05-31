const signalOptions = {
  equals: false
};

const observers = []

function createEffect (effect) {
  const execute = () => {
    // 保存在observers中
    observers.push(execute);
    try {
      effect();
    } finally {
      // 释放
      observers.pop();
    }
  };
  // 副作用函数立即执行
  execute();
};

function createSignal(value, options) {
  // 初始化options
  options = options
      ? Object.assign({}, signalOptions, options)
      : signalOptions;
  // 创建内部signal
  const s = {
    value,
    // 保存订阅者
    subscribers: new Set(),
    comparator: options.equals || undefined
  };
 
  // 定义setter
  const setter = value => {
    if (typeof value === "function") {
      value = value(s.value);
    }
    return writeSignal(s, value);
  };
  // 返回[getter, setter]
  return [readSignal.bind(s), setter];
}

// 返回当前内部signal的value
function readSignal() {
  const curr = observers[observers.length - 1]
  curr && this.subscribers.add(curr)
  return this.value;
}

// 更新内部的value，然后返回value
function writeSignal(node, value) {
  if (!node.comparator) {
    node.value = value;
  }
  // 每次写入时执行对应的订阅者
  node.subscribers.forEach((subscriber) => subscriber());
  return value;
}

const createMemo = (memo) => {
  const [value, setValue] = createSignal();

  createEffect(() => {
    setValue(memo());
  });

  return value;
};
