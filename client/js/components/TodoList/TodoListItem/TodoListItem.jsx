import React, { Component, PropTypes } from 'react';
import moment from 'moment';

import { Checkbox, FontIcon, IconButton } from 'material-ui';
import { ListItem } from 'material-ui/List';

export default class TodoListItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      completed: props.todo.completed,
    }

  }

  handleCheck(event, isInputChecked) {
    this.props.onToggle();
    this.setState({
      completed: !this.state.completed
    });
  }

  handleDeleteClick(event) {
    this.props.onDelete();
  }

  render(){
    const completedCheckbox = (
      <Checkbox
        checked={this.state.completed}
        onCheck={this.handleCheck.bind(this)}
      />
    );

    const deleteIconButton = (
      <IconButton
        tooltip="Delete item"
        tooltipPosition="bottom-left"
        onClick={this.handleDeleteClick.bind(this)}>
        <FontIcon className="material-icons">delete</FontIcon>
      </IconButton>
    )

    return (
      <ListItem
        leftCheckbox={completedCheckbox}
        rightIconButton={deleteIconButton}
        primaryText={this.props.todo.title}
        secondaryText={moment(this.props.todo.creationTime).fromNow()}
        style={this.props.todo.completed ? {textDecoration: 'line-through'} : {}}/>
    )
  }
}

TodoListItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    creationTime: PropTypes.instanceOf(Date).isRequired,
    completed: PropTypes.bool.isRequired
  }),
  onToggle: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
}
