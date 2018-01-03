import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import { withRouter } from 'react-router'
import { Switch, Route } from 'react-router-dom';
import { fetchCategories } from '../utils/api';
import { setCategories } from '../actions/categories';
import CategoryList from './CategoryList';
import PostList from './PostList';
import PostForm from './PostForm';
import PostView from './PostView';
import NoMatch from './NoMatch';

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
        <Switch>
          <Route path="/" exact
            render={() => (
              <PostList/>
            )} />
          <Route path="/create" exact
            render={() => (
              <PostForm/>
            )} />
          <Route path="/edit/:id" exact
            render={() => (
              <PostForm/>
            )} />
          <Route path="/post/:id" exact
            render={() => (
              <PostView/>
            )} />
          <Route exact path="/:category" component={PostList}/>
          <Route component={NoMatch}/>
        </Switch>

      </div>
    );
  }
}

function mapDispatchToProps (dispatch) {
  return {
    setCategories: (data) => dispatch(setCategories(data)),
  }
}

function mapStateToProps({categories, posts}) {
  return {
    categories: categories,
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
