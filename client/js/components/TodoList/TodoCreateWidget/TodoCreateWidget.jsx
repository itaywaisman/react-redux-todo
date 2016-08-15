import React, { Component, PropTypes } from 'react';
import { Paper, TextField } from 'material-ui';


export default class TodoCreateWidget extends Component {
  constructor(props) {
    super();

    this.state = {
      newTodoTitle: '',
    }
  }

  handleKeyDown(event) {
    if (event.key === "Enter") {
      this.props.onSubmit(event.target.value.trim());
      this.setState({
        newTodoTitle: ''
      })
    }
  }

  handleChange(event) {
    this.setState({
      newTodoTitle: event.target.value
    })
  }

  render() {
    return (
        <TextField
          value={this.state.newTodoTitle}
          hintText="What needs to be done?"
          style={{width: '100%'}}
          onKeyDown={this.handleKeyDown.bind(this)}
          onChange={this.handleChange.bind(this)}
          autoFocus={true}>
        </TextField>
    )
  }
}

TodoCreateWidget.propTypes = {
  onSubmit: PropTypes.func.isRequired
}
