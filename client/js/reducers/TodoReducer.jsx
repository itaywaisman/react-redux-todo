import cuid from 'cuid';
import { createSelector } from 'reselect';


// Initial State
const initialState = {
  fetchingTodos: false,
  working: false,
  data: [],
  filterType: 'SHOW_ALL'
}


const todoReducer = (state, action) => {
  switch (action.type) {
    case "TOGGLE_TODO_FULFILLED": {
      if (state.cuid !== action.payload.data.cuid) {
        return state;
      }
      console.log('updating todo by toggle')
      return {
        ...state,
        completed: !state.completed
      }
    }
    default: {
      return state;
    }
  }
}


const todosReducer = (state = initialState, action ) => {
  switch (action.type) {
    case 'FETCH_TODOS_PENDING': {
      return {
        ...state,
        fetchingTodos: true,
        working: true
      }
    }
    case 'FETCH_TODOS_REJECTED': {
      return {
        ...state,
        fetchingTodos: false,
        working: false
      }
    }
    case 'FETCH_TODOS_FULFILLED': {
      return {
        ...state,
        fetchingTodos: false,
        working: false,
        data: action.payload.data.todos.map(t => { return {...t, creationTime: new Date(t.creationTime)}})
      }
    }
    case "CREATE_TODO_PENDING": {
      return {
        ...state,
        working: true,
      }
    }
    case "CREATE_TODO_REJECTED": {
      return {
        ...state,
        working: false
      }
    }
    case "CREATE_TODO_FULFILLED": {
      const newTodo = action.payload.data;
      newTodo.creationTime = new Date(newTodo.creationTime);

      return {
        ...state,
        working: false,
        data: state.data.concat([newTodo])
      }
    }
    case "TOGGLE_TODO_FULFILLED": {
      return {
        ...state,
        data: state.data.map(todo => todoReducer(todo, action))
      }
    }
    case "DELETE_TODO_FULFILLED": {
      return {
        ...state,
        data: state.data.filter(todo => todo.cuid !== action.payload.data.cuid)
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
