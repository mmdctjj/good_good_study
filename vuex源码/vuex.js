let _Vue

class Store {
    constructor (options) {
        this._vm = new _Vue({
            data: {
                $$store: options.state
            }
        })
        this._actions = options.actions
        this._mutations = options.mutations
        this.commit = this.commit.bind(this)
        this.dispatch = this.dispatch.bind(this)
    }
    get state () {
        return this._vm.$data.$$store
    }
    set state (a) {
        console.error('use store.replaceState() to explicit replace store state.')
    }
    commit (_type, _payload) {
        const entry = this._mutations[_type]
        if (!entry) {
            console.error(`[vuex] unknown mutation type: ${_type}`)
        }
        entry(this.state, _payload)
    }
    dispatch (_type, _payload) {
        const entry = this._actions[_type]
        if (!entry) {
            console.error(`[vuex] unknown action type: ${_type}`)
        }
        entry(this, _payload)
    }
}

const install = Vue => {
    _Vue = Vue
    Vue.mixin({
        beforeCreate () {
            if (this.$options.store) Vue.prototype.$store = this.$options.store
        }
    })
}

const Vuex = { Store, install }