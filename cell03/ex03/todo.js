window.onload = function() {
  const cookies = document.cookie.split('; ')
  const todoCookie = cookies.find(cookie => cookie.startsWith('todos='))

  if (todoCookie) {
    const todoList = JSON.parse(todoCookie.split('=')[1])
    const ftList = document.getElementById('ft_list')

    todoList.forEach(todo => {
      const newDiv = createNewDiv(todo)
      ftList.appendChild(newDiv, ftList.firstChild)
    })
  }
}

function createNewDiv({ id, title }) {
  const newDiv = document.createElement('div')
  newDiv.textContent = title
  newDiv.className = 'todo-item'
  newDiv.id = id
  newDiv.onclick = function () {
    deleteTodo(id)
  }

  return newDiv
}

function createNewTodo() {
  const td = prompt('New todo name')

  if (td) {
    const newId = new Date().getTime()
    const newDiv = createNewDiv({ id: newId, title: td })

    const ftList = document.getElementById('ft_list')
    ftList.insertBefore(newDiv, ftList.firstChild)
  }

  saveTodoList()
}

function deleteTodo(id) {
  const todo = document.getElementById(id)

  if (todo && confirm('Do you want to delete this?')) {
    todo.remove()
  }

  saveTodoList()
}

function saveTodoList() {
  const todoList = document.getElementById('ft_list')
  const todos = todoList.getElementsByClassName('todo-item')
  const todoArray = Array.from(todos).map(todo => ({
    id: todo.id, title: todo.textContent
  }))

  document.cookie = `todos=${JSON.stringify(todoArray)}; path=/`

  return todoArray
}
