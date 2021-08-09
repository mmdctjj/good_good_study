class InterceptorsMenger {

}

class Axios {
    constructor (instanceConfig) {
        this.defaults = instanceConfig
        this.interceptors = {
            request: new InterceptorsMenger(),
            responend: new InterceptorsMenger()
        }
    }
    request (config) {
        return new Promise ((resolve, reject) => {
            const xml = new XMLHttpRequest()
            xml.open(config.method, config.url)
            xml.onload(responend => {
                resolve(responend)
            })
            xml.onerror(err => {
                reject(err)
            })
            xml.send(config.data)
        })
    }
}

['post', 'get', 'put', 'option', 'delete'].forEach(method => {
    Axios.prototype[method] = (url, data) => {
        this.request({
            method,
            url,
            data
        })
    }
})

function createInstance (config) {
    const context = new Axios(config)

    const instance = Axios.prototype.request.bind(context)

    Object.keys(Axios.prototype).forEach(method => {
        Object.defineProperty(instance, method, {
            get: Axios.prototype[method].bind(context)
        })
    })
    Object.keys(context).forEach(key => {
        Object.defineProperty(instance, key, {
            get: context[key]
        })
    })
    return instance
}