import React, { Component, PropTypes } from 'react';

import { AppBar } from 'material-ui';

class NavigationBar extends Component {
  constructor(props) {
    super();
  }

  render() {
    return (
      <AppBar title="Todo list" />
    )
  }
}

export default NavigationBar;
