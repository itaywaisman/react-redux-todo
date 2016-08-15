import React, { Component, PropTypes } from 'react';

import { BottomNavigation, BottomNavigationItem } from 'material-ui/BottomNavigation';
import { FontIcon, Paper } from 'material-ui';

const styles = require('./Footer.css');

const allIcon = <FontIcon className="material-icons">indeterminate_check_box</FontIcon>;
const activeIcon = <FontIcon className="material-icons">check_box_outline_blank</FontIcon>;
const completedIcon = <FontIcon className="material-icons">check_box</FontIcon>;

export default class Footer extends Component {
  constructor(props) {
    super();

    this.state = {
      selectedIndex: 0
    }
  }

  changeSelection(index) {
    const filterTypes = ['SHOW_ALL', 'SHOW_ACTIVE', 'SHOW_COMPLETED'];
    this.props.onFilterChanged(filterTypes[index]);
    this.setState({
      selectedIndex: index
    })
  }

  render() {
    return (
      <Paper zDepth={1} className={styles['footer']}>
        <BottomNavigation selectedIndex={this.state.selectedIndex}>
          <BottomNavigationItem
            label="All"
            icon={allIcon}
            onTouchTap={this.changeSelection.bind(this, 0)}/>
          <BottomNavigationItem
            label="Active"
            icon={activeIcon}
            onTouchTap={this.changeSelection.bind(this, 1)}/>
          <BottomNavigationItem
            label="Completed"
            icon={completedIcon}
            onTouchTap={this.changeSelection.bind(this, 2)}/>
        </BottomNavigation>
      </Paper>
    );
  }
}


Footer.propTypes = {
  onFilterChanged: PropTypes.func.isRequired
}
