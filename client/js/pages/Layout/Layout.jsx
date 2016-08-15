import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Footer from '../../components/Layout/Footer/Footer';
import NavigationBar from '../../components/Layout/NavBar/NavBar';

import * as TodoActions from '../../actions/TodoActions';
import { getFilterType } from '../../reducers/TodoReducer';
import styles from './Layout.css';

class Layout extends Component {

  constructor (props) {
    super(props);
  }

  handleFilterChanged(filterType) {
    this.props.dispatch(TodoActions.filterTodos(filterType));
  }

  render() {
    return (
      <div>
        <NavigationBar></NavigationBar>
        {this.props.children}
        <Footer onFilterChanged={this.handleFilterChanged.bind(this)}></Footer>
      </div>

    )
  }
}

function mapStateToProps (state) {
  return {
    filterType: getFilterType(state)
  };
}

Layout.propTypes = {
  dispatch: PropTypes.func.isRequired
}



export default connect(mapStateToProps)(Layout);
