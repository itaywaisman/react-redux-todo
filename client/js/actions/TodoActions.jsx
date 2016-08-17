import cuid from 'cuid';
import axios from 'axios';

export const SHOW_ALL = 'SHOW_ALL';
export const SHOW_ACTIVE = 'SHOW_ACTIVE';
export const SHOW_COMPLETED = 'SHOW_COMPLETED';

export function fetchTodos(){
  return {
    type: 'FETCH_TODOS',
    payload: axios.get('/api/todos')
  }
}

export function createTodo(title) {
  return {
    type: "CREATE_TODO",
    payload: axios.post('/api/todos', { todo: { title: title} })
  }
}

export function toggleTodo(todo) {
  return {
    type: 'TOGGLE_TODO',
    payload: axios.put('/api/todos/' + todo.cuid, { todo: { completed: !todo.completed }})
  }
}

export function deleteTodo(todo) {
  return {
    type: 'DELETE_TODO',
    payload: axios.delete('/api/todos/' + todo.cuid)
  }
}

export function filterTodos(filterType) {
  return {
    type: 'FILTER_TODOS',
    payload: filterType
  }
}
