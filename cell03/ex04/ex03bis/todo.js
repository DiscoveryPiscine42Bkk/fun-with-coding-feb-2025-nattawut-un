$(function() {
  const cookies = document.cookie.split(';')
  const todoCookie = cookies.find(cookie => cookie.startsWith('todos='))

  if (todoCookie) {
    const todoList = JSON.parse(todoCookie.split('=')[1])
    const ftList = $('#ft-list')

    todoList.forEach(todo => {
      const newDiv = createNewDiv(todo)
      ftList.append(newDiv)
    })
  }

  $('.new-button').click(function() {
    const td = prompt('New todo name')

    if (td) {
      const newId = new Date().getTime()
      const newDiv = createNewDiv({ id: newId, title: td })

      const ftList = $('#ft-list')
      ftList.prepend(newDiv)

      saveTodoList()
    }

  })
})

function createNewDiv({ id, title }) {
  const newDiv = $('<div></div>')
    .text(title)
    .addClass('todo-item')
    .attr('id', id)
    .click(function () {
      if (confirm('Do you want to delete this?')) {
        $(this).remove()
        saveTodoList()
      }
    })

  return newDiv
}

function saveTodoList() {
  const todos = $('#ft-list').find('.todo-item')
  const todoArray = $.map(todos, function(todo) {
    return {
      id: $(todo).attr('id'),
      title: $(todo).text()
    }
  })

  document.cookie = `todos=${JSON.stringify(todoArray)}; path=/`

  return todoArray
}
