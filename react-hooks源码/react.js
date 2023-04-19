let isMount = true

let workInProcessHook = null

const fiber = {
  stateNode: App,
  memoizedState: null,
}

function schedule () {
  workInProcessHook = fiber.memoizedState
  const app = fiber.stateNode()
  isMount = false
  return app
}

function useState(initialState) {
  let hook;

  if (isMount) {
    hook = {
      memoizedState: initialState,
      next: null,
      queue: {
        pedding: null
      }
    }
    if (!fiber.memoizedState) {
      fiber.memoizedState = hook
      
    } else {
      workInProcessHook.next = hook
    }
    workInProcessHook = hook
  } else {
    hook = workInProcessHook
    workInProcessHook = workInProcessHook.next
  }

  let baseState = hook.memoizedState

  if (hook.queue.pedding) {

    let firstupdate = hook.queue.pedding.next

    do {
      const action = firstupdate.action
      baseState = action(baseState)
      firstupdate = firstupdate.next
    } while (firstupdate !== hook.queue.pedding.next)

    hook.queue.pedding = null
  }
  hook.memoizedState = baseState
  return [baseState, dispatchAction.bind(null, hook.queue)]
}

function dispatchAction(queue, action) {
  const update = {
    action,
    next: null
  }

  if (queue.pedding === null) {
    update.next = update
  } else {
    update.next = queue.pedding.next
    queue.pedding.next = update
  }
  queue.pedding = update

  schedule()
}

function App () {
  const [num, setNum] = useState(0)
  const [num1, setNum1] = useState(10)

  console.log('isMount', isMount)
  console.log('num', num)
  console.log('num1', num1)

  return {
    onClick() {
      setNum(n => n + 1)
    },
    onFocus() {
      setNum1(n => n + 10)
    }
  } 
}

window.app = schedule()