import { reactive } from 'vue'

export const useAsyncFn = (fn) => {

  const data = reactive({
    value: null,
    loading: false
  })
  
  const callback = params => {
    
    data.loading = true

    fn(params).then(res => {
      data.value = res
      data.loading = false
    }).catch(() => {
      data.loading = false
    })
    return
  }
  
  return [data, callback]

}