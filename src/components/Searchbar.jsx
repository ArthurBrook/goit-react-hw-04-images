import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './styles.css';

class Searchbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onSubmit(this.state.query);
  };

  handleChange = (e) => {
    this.setState({ query: e.target.value });
  };

  render() {
    return (
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={this.handleSubmit}>
          <button type="submit" className="SearchForm-button">
            <span className="SearchForm-icon">🔍</span>
            <span className="SearchForm-button-label">Search</span>
          </button>
          <input
            className="SearchForm-input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.query}
            onChange={this.handleChange}
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
