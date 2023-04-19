<template>
  <div>{{data.value}}</div>
  <div>{{test}}</div>
  <button @click="() => fn()">fsfs</button>
  <div>{{flag}}</div>
  <button @click="() => flagFn()">change flag</button>
</template>

<script>
import { useAsyncFn } from '../hooks/useAsyncFn'
import { useAsync } from '../hooks/useAsync'
import { useTrigger } from '../hooks/useTrigger'
import { computed, watchEffect } from '@vue/runtime-core'

const fetch = function () {

  return new Promise(resolve => {
    resolve(1)
  })
  
}

export default {
  setup () {

    const [, fn] = useAsyncFn(fetch)

    const data = useAsync(fetch)

    const [flag, flagFn] = useTrigger()

    const test = computed(() => data ? data.value + 1 : 'hhh')

    watchEffect(() => {

      console.log(data.loading)

    }, data.loading)

    return { data, fn, flag, flagFn, test }
  }
}
</script>

<style>

</style>