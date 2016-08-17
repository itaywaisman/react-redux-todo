import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

// Import selectors
import { getVisibleTodos } from '../../reducers/TodoReducer';

// Import Actions
import * as TodoActions from '../../actions/TodoActions';

// Import components
import TodoCreateWidget from '../../components/TodoList/TodoCreateWidget/TodoCreateWidget';
import TodoListItem from '../../components/TodoList/TodoListItem/TodoListItem';
import { List } from 'material-ui/List';
import { Paper, Subheader } from 'material-ui';

class TodoList extends Component {

  constructor(props) {
    super();
  }

  componentDidMount() {
    this.props.dispatch(TodoActions.fetchTodos());
  }

  handleCreateTodo(title) {
    this.props.dispatch(TodoActions.createTodo(title))
  }

  handleTodoToggle(todo) {
    this.props.dispatch(TodoActions.toggleTodo(todo));
  }

  handleTodoDelete(todo) {
    this.props.dispatch(TodoActions.deleteTodo(todo));
  }



  render() {
    let todoListContent = (<Subheader>You've got nothing to do!</Subheader>)
    if (this.props.todos && this.props.todos.length > 0) {
      todoListContent = (
        <List>
          {this.props.todos.map(todo =>
            <TodoListItem
              key={todo.cuid}
              todo={todo}
              onToggle={() => this.handleTodoToggle(todo)}
              onDelete={() => this.handleTodoDelete(todo)}></TodoListItem>
          )}
        </List>
      );
    }

    return (
      <div style={{margin: '5pt'}}>
        <TodoCreateWidget
          onSubmit={this.handleCreateTodo.bind(this)}>
        </TodoCreateWidget>
        <Paper zDepth={1} style={{margin: '5pt'}}>
          {todoListContent}
        </Paper>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    todos: getVisibleTodos(state)
  };
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    cuid: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    creationTime: PropTypes.instanceOf(Date).isRequired,
    completed: PropTypes.bool.isRequired
  })).isRequired,
  dispatch: PropTypes.func.isRequired
}

TodoList.contextTypes = {
  router: PropTypes.object
}

export default connect(mapStateToProps)(TodoList);
