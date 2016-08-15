import cuid from 'cuid';

export const SHOW_ALL = 'SHOW_ALL';
export const SHOW_ACTIVE = 'SHOW_ACTIVE';
export const SHOW_COMPLETED = 'SHOW_COMPLETED';

export function createTodo(title) {
  return {
    type: "CREATE_TODO",
    payload: {
      id: cuid(),
      title: title,
      creationTime: new Date(),
      completed: false,
    }
  }
}

export function toggleTodo(todo) {

  return {
    type: 'TOGGLE_TODO',
    payload: todo
  }
}

export function deleteTodo(todo) {
  return {
    type: 'DELETE_TODO',
    payload: todo
  }
}

export function filterTodos(filterType) {
  return {
    type: 'FILTER_TODOS',
    payload: filterType
  }
}
