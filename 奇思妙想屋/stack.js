class HistoryStack {
    
  constructor () {
      // 记录已标记（点击上一页时展示的数据）
      this.history = []
      // 存放弹出的（点击下一页时展示的数据）
      this.memory = []
  }
  
  // 标记时推入
  push (tag) {
      this.history.push(tag)
  }
  
  // 弹出
  pops (size) {
      
      // 弹出记录下来
      const container = 
          this.history
              .splice(
                  this.history.length - size,
                  size
              )
              
      // 记录弹出
      this.memory = this.memory.concat(...container)
      
      // 每次弹出时捕获
      return container
  }
  
  // 推入
  pushs (size) {
  
      // 推入时也记录下来
      const container = 
          this.memory
              .splice(
                  this.memory.length - size,
                  size
              )
              
      // 推入弹出的记录
      this.history = this.history.concat(...container)
      
      // 每次推入时捕获
      return container
  }

  // 删除
  delete (id) {
        
    // 查找位置
    const index = this.history.findIndex(his => his.id === id)

    // 这里是确认是在上一页中删除还是下一页中删除哦
    if (index !== -1) {
    
      this.history.splice(index - 1, 1)
    
    } else {
    
      const index = this.memory.findIndex(meo => meo.id === id)
      
      if (index !== -1) this.memory.splice(index, 1)
    
    }
  }

  // 修正标记，但是这个修正是有副作用的，因为会改变存放的位置
  edit (tag) {

    // 查找位置
    const index = this.history.findIndex(his => his.id === tag.id)

    // 这里是确认是在上一页中删除还是下一页中删除哦
    if (index !== -1) {
    
      this.history[index] = tag
    
    } else {
    
      const index = this.memory.findIndex(meo => meo.id === tag.id)
      
      if (index !== -1) this.memory[index] = tag
    
    }
  }

  // 复制
  copy (data) {
    
    const { history = [], memory = [] } = data
    
    this.history = history
    this.memory = memory
    
  }


  // 关闭时重置
  close () {
      
    // 重置
    this.history = this.history.concat(...this.memory)
    this.memory = []
      
  }
  
}