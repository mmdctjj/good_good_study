let _Vue

class Store {
    constructor (options) {
        // 将用户定义的state存储为vue实例化之后的响应式数据
        this._vm = new _Vue({
            data: {
                $$store: options.state
            }
        })
        // 存储actions、mutations，分别改变this指向
        this._actions = options.actions
        this._mutations = options.mutations
        this.commit = this.commit.bind(this)
        this.dispatch = this.dispatch.bind(this)
        // 遍历出所有的getter
        this.getters = {}
        if (options.getters) {
            Object.keys(options.getters).forEach(key => {
                Object.defineProperty(this.getters, key, {
                    get: () => options.getters[key](this.state),
                    enumerable: true
                })
            })
        }
        // 遍历所有的modules
        if (options.modules) {
            Object.keys(options.modules).forEach(module => {
                const { state, getters, _actions, _mutations } = new Store(options.modules[module])
                // 合并state
                Object.defineProperty(this.state, module, {
                    get: () => state
                })
                // 合并getters
                Object.keys(getters).forEach(getter => {
                    if (this.getters[getter]) {
                        console.error(`duplicate getter key: ${getter}`)
                        return
                    }
                    Object.defineProperty(this.getters, getter, {
                        get: () => getters[getter](state)
                    })
                })
                // 合并actions
                Object.keys(_actions).forEach(action => {
                    if (this._actions[action]) {
                        console.error(`duplicate action key: ${action}`)
                        return
                    }
                    Object.defineProperty(this._actions, action, {
                        get: () => _actions[action]
                    })
                })
                // 合并mutations
                Object.keys(_mutations).forEach(mutation => {
                    if (this._mutations[mutation]) {
                        console.error(`duplicate mutation key: ${mutation}`)
                        return
                    }
                    Object.defineProperty(this._mutations, mutation, {
                        get: () => _mutations[mutation].bind(this, state, ...[...arguments].slice(1))
                    })
                })
            })
        }
    }
    // 定义state的访问
    get state () {
        return this._vm.$data.$$store
    }
    // 屏蔽用户直接更改state
    set state (a) {
        console.error('use store.replaceState() to explicit replace store state.')
    }
    // 定义commit方法
    commit (_type, _payload) {
        const entry = this._mutations[_type]
        if (!entry) console.error(`[vuex] unknown mutation type: ${_type}`)
        entry(this.state, _payload)
    }
    // 定义dispatch方法
    dispatch (_type, _payload) {
        const entry = this._actions[_type]
        if (!entry) console.error(`[vuex] unknown action type: ${_type}`)
        entry(this, _payload)
    }
}

// 将store挂载哎vue原型链上
const install = Vue => {
    _Vue = Vue
    Vue.mixin({
        beforeCreate () {
            if (this.$options.store) Vue.prototype.$store = this.$options.store
        }
    })
}

const Vuex = { Store, install }