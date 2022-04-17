import { mutableHandlers } from './baseHandlers'

export function reactivity (target) {
  return createReactivity(target, mutableHandlers)
}

function createReactivity(target, baseHandlers) {
  return new Proxy(target, baseHandlers)
}
