import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import { fetchCategories } from '../utils/api';
import { setCategories } from '../actions/categories';
import CategoryList from './CategoryList';

class App extends Component {
  state = {
    categories: null,
  }

  getCategories() {
    fetchCategories()
      .then((categories) => this.props.setCategories(categories)
    );
  }
  componentDidMount() {
    this.getCategories();
  }

  render() {
    const {categories} = this.props.categories;

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Readable</h1>
        </header>

        <CategoryList list={categories}/>
      </div>


    );
  }
}

function mapDispatchToProps (dispatch) {
  return {
    setCategories: (data) => dispatch(setCategories(data)),
  }
}

function mapStateToProps({categories}) {
  return {
    categories: categories,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
