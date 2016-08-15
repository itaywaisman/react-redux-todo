import cuid from 'cuid';
import { createSelector } from 'reselect';


// Initial State
const initialState = {
  data: [
    {
      id: cuid(),
      title: 'Todo 1',
      creationTime: new Date(),
      completed: false,
    },
    {
      id:cuid(),
      title: 'Todo 2',
      creationTime: new Date(),
      completed: false,
    },
    {
      id: cuid(),
      title: 'Todo 3',
      creationTime: new Date(),
      completed: false,
    },
    {
      id: cuid(),
      title: 'Todo 4',
      creationTime: new Date(),
      completed: false,
    }
  ],
  filterType: 'SHOW_ALL'
}


const todoReducer = (state, action) => {
  switch (action.type) {
    case "TOGGLE_TODO": {
      if (state.id !== action.payload.id) {
        return state;
      }
      return {
        ...state,
        completed: !state.completed
      }
    }
  }
}


const todosReducer = (state = initialState, action ) => {
  switch (action.type) {
    case "CREATE_TODO": {
      return {
        ...state,
        data: state.data.concat([action.payload])
      }
    }
    case "TOGGLE_TODO": {
      return {
        ...state,
        data: state.data.map(todo => todoReducer(todo, action))
      }
    }
    case "DELETE_TODO": {
      return {
        ...state,
        data: state.data.filter(todo => todo.id !== action.payload.id)
      }
    }
    case 'FILTER_TODOS': {
      return {
        ...state,
        filterType: action.payload
      }
    }
    default:
      return state;
  }
}
export const getTodos = state => state.todos.data;
export const getFilterType = (state) => state.todos.filterType;

export const getVisibleTodos = createSelector([getFilterType, getTodos],
  (filterType, todos) => {
    switch (filterType) {
      case 'SHOW_ALL':
        return todos;
      case 'SHOW_ACTIVE':
        return todos.filter(t => !t.completed);
      case 'SHOW_COMPLETED':
        return todos.filter(t => t.completed);
      default:
        return todos;
    }
  }
)

export default todosReducer;
