// 创建vue类
class Vue {
	constructor(options) {
		let vm = this;
		this.$options = options;
		this._data = this.$options.data;
		// 代理data中的每个属性
		Object.keys(this._data).forEach(key => {
			vm.proxy(key);
		});
		// 劫持data中的属性，当值发生变化时重新编译变化的节点
		new Observer(this._data, vm)
		// 编译节点到页面
		this.$compile = new Compile(
			this.$options.el ? this.$options.el : document.body,
			vm
		);
	}
	// 数据代理
	proxy(key) {
		let vm = this;
		// 给实例挂载代理的属性，名称及值和data中属性名对应
		Object.defineProperty(vm, key, {
			configurable: false,
			enumerable: true,
			get: () => {
				return vm._data[key]
			},
			set: newVal => {
				return vm._data[key] = newVal
			}
		});
	}
}

// 创建观察者类
class Observer {
	constructor(data, vm) {
		this.data = data;
		this.$vm = vm;
		this.walk();
	}
	walk() {
		Object.keys(this.data).forEach(key => {
			this.defineReactive(key, this.data[key]);
		})
	}
	defineReactive(key, val){
		// 每个属性实例化dep对象，存放它所有的监听者
		let dep = new Dep();
		// 重新定义data对象的属性，以便给属性添加get方法和set方法
		Object.defineProperty(this.data, key, {
			configurable: false,
			enumerable: true,
			get: () => {
				if (Dep.target) {
					dep.depend();
				}
				return val;
			},
			set: (newVal) => {
				if (val !== newVal) {
					dep.notify(newVal);
				}
				val = newVal;
				return
			}
		})
	}
}

// 创建编译类
class Compile {
	constructor(el, vm) {
		this.$vm = vm
		this.$el = document.querySelector(el);
		if (this.$el) {
			// 1.将el元素节点取出来
			this.$fragment = this.createFragmentObj(this.$el)
			// 2.生成相应的Vdom
			this.createVdom(this.$fragment);
			// 3.将生成的Vdom插入到页面
			this.$el.appendChild(this.$fragment)
		}
	}
	// 创建fragment对象
	createFragmentObj(el) {
		let fragment = document.createDocumentFragment();
		let child;
		while (child = el.firstChild) {
			fragment.appendChild(child);
		}
		return fragment;
	}
	// 创建虚拟dom
	createVdom(fragment) {
		// 取出所有子节点
		let childNodes = fragment.childNodes;
		Array.prototype.slice.call(childNodes).forEach(childNode => {
			// 取出文本节点
			let text = childNode.textContent;
			// 匹配出大括号表达式
			let reg = /\{\{(.*)\}\}/;
			// 根据节点类型分别编译
			// 如果是文本节点并且包含大括号表达式
			if (childNode.nodeType === 3 && reg.test(text)) {
				// 如果是文本节点
				this.compileText(childNode, RegExp.$1);
			} else if (childNode.nodeType === 1 && !childNode.hasChildNodes()) {
				// 如果是dom节点且没有子元素
				this.compileInnerHTML(childNode);
			} else if (childNode.nodeType === 1 && childNode.hasChildNodes()) {
				// 如果是dom节点并且还有子元素就调用createVdom回到上面
				this.createVdom(childNode);
			}
		});
	}
	// 编译文本节点
	compileText(node, temp) {
		this.updataDomVal(node, temp, "textContent", this.$vm[temp]);
	}
	// 编译innerHTML节点
	compileInnerHTML(node) {
		Object.keys(node.attributes).forEach(key => {
			let exp = node.attributes[key]["nodeValue"];
			let val = this.$vm[node.attributes[key]["nodeValue"]];
			// 普通指令渲染
			switch (node.attributes[key]["nodeName"]) {
				case "v-text":
					this.updataDomVal(node, exp, "textContent", val);
					break;
				case "v-html":
					this.updataDomVal(node, exp, "innerHTML", val);
					break;
			}
			// 事件指令解析
			if (node.attributes[key]["nodeName"].search("v-on") != -1) {
				let eventType = node.attributes[key]["nodeName"].split(":")[1];
				let eventName = node.attributes[key]["nodeValue"];
				let event = this.$vm.$options.methods[eventName];
				node.addEventListener(eventType, () => {
					event.bind(this.$vm)();
				});
				node.removeEventListener(eventType, () => {
					event.bind(this.$vm)();
				});
			}
		});
	}
	// 更新节点
	updataDomVal(node, exp, domType, domValue) {
		// 标记每个使用data属性对象的dom节点位置, 并一直监听，当有变化时，会被dep实例捕获
		new Watcher(this.$vm, node, exp, (newVal, oldVal) => {
			node[domType] = newVal;
		});
		node[domType] = domValue;
	}
}

let uid = 0;

// 创建依赖类，捕获每个监听点的变化
class Dep {
	constructor() {
		this.subList = [];
	}
	// 建立依赖给dep和watcher
	depend() {
		Dep.target.addDep(this)
	}
	// 添加watcher到sublist中
	addSub(sub) {
		this.subList.push(sub)
	}
	// 通知所有watcher值改变了
	notify(newVal) {
		this.subList.forEach(sub => {
			sub.updata(newVal)
		})
	}
}
Dep.target = null

// 创建监听类，监听每个渲染数据地方
class Watcher {
	constructor(vm, node, exp, callback) {
		// 每个watcher的唯一标识
		this.uid = uid++;
		this.$vm = vm;
		// 每个watcher监听节点
		this.node = node;
		// 每个watcher监听节点的属性名称表达式
		this.exp = exp;
		// 每个watcher监听节点的回调函数
		this.callback = callback;
		// 每个watcher监听的节点列表
		this.depList = {};
		// 每个监听节点的初始值
		this.value = this.getVal();
	}
	addDep(dep) {
		if (!this.depList.hasOwnProperty(dep.uid)) {
			dep.addSub(this);
		}
	}
	updata(newVal) {
		this.callback.call(this.$vm, newVal, this.value)
	}
	getVal() {
		// 获取值时将当前watcher指向Dep.target，方便在数据劫持get函数里建立依赖关系
		Dep.target = this;
		// 获取当前节点位置值
		let val = this.$vm[this.exp];
		// 获取完之后将Dep.target设置为null
		Dep.target = null;
		return val;
	}
}