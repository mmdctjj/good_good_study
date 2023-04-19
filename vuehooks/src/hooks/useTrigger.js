import { ref } from "@vue/reactivity";

export const useTrigger = () => {

  const flag = ref(false)

  const changeFlag = () => flag.value = !flag.value

  return [flag, changeFlag]
}