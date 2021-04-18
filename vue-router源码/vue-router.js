let _Vue

class VueRouter {
    constructor (option) {
        this.$options = option
        // 利用官方工具包设置响应式的的current
        _Vue.util.defineReactive(this, 'current', window.location.hash.slice(1) || '/')
        // load事件：加#号
        window.addEventListener('load', () => {
            if (window.location.hash.indexOf('#') === -1) window.location.hash = window.location.hash + '/#'
        })
        // hashchange事件，改变current触发router-view更新视图
        window.addEventListener('hashchange', () => {
            // 去掉#号
            this.current = window.location.hash.slice(1)
        })
    }
    // push方法，更改当前路由
    push (target) {
        if (Object.prototype.toString.call(target) === '[object String]') {
            this.current = target
        } else if (Object.prototype.toString.call(target) === '[object Object]') {
            if (target.name) {
                const curr = this.$options.routes.find(route => route.name === target.name)
                if (curr) this.current = curr.path
            } else if (target.path) {
                this.current = target.path
            }
        }
    }
}

VueRouter.install = Vue => {
    // 1.保存vue
    _Vue = Vue

    // 2.挂在router
    Vue.mixin({
        beforeCreate () {
            // 检查是否有router选项，如果有就挂在到Vue原型链上
            if (this.$options.router) Vue.prototype.$router = this.$options.router
        }
    })

    // 3.注册组件
    Vue.component('router-view', {
        render (h) {
            let component = null
            const curr = this.$router.$options.routes.find(route => route.path === this.$router.current)
            if (curr) component = curr.component
            return h(component)
        }
    })
    Vue.component('router-link', {
        props: {
            to: String
        },
        render (h) {
            return h('a', {
                attrs: {
                    href: `#${this.to}`
                }
            }, this.$slots.default)
        }
    })
}