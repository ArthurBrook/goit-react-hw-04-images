import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './styles.css';

class Button extends Component {
  handleClick = () => {
    this.props.onLoadMore();
  };

  render() {
    return (
      <button type="button" className="Button" onClick={this.handleClick}>
        Load more
      </button>
    );
  }
}

Button.propTypes = {
  onLoadMore: PropTypes.func.isRequired,
};

export default Button;
