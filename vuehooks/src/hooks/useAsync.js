import { onBeforeMount, reactive } from 'vue'

export const useAsync = (fn, params) => {

  const data = reactive({
    value: null,
    loading: false
  })
  
  onBeforeMount(() => {

    data.loading = true

    fn(params).then(res => {
      data.value = res
      data.loading = false
    }).catch(() => {
      data.loading = false
    })

    return
  })
  
  return data

}