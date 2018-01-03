import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom';
import { fetchPosts } from '../utils/api';
import { setPosts, sortPosts } from '../actions/posts';

class PostList extends Component {
    constructor(props) {
        super(props);
        
       //Here ya go
        this.props.history.listen((location, action) => {
          console.log("on route change");
          this.updateState();
        });
      }
      
  state = {
    posts: null,
    category: ''
  }
  updateState() {
    if (this.props.match && this.props.match.params.category)
      this.setState({ category: this.props.match.params.category }, this.getPosts);
    else
      this.setState({ category: '' }, this.getPosts);
  }
  getPosts() {
    fetchPosts(this.state.category)
      .then((posts) => this.props.setPosts(posts)
    );
  }
  componentDidMount() {
    this.updateState();
  }
  navigateToNewPost() {
    this.props.history.push('/create');
  }
  render () {
    const posts = this.props.posts.posts;

    if (!posts || !posts.length)
      return (<p>No posts.</p>);

    return (
        <div className='post-list'>
        <button onClick={() => this.props.sortPosts('date')}>Sort by date</button>
        <button onClick={() => this.props.sortPosts('score')}>Sort by score</button>
        <button onClick={() => this.navigateToNewPost()}>New Post</button>
            <ul>
            {posts.map((item) => (
                <li key={item.id}>
                    <Link to={"/post/" + item.id}>{item.title}</Link>
                </li>
            ))}
            </ul>
        </div>
    )
  }
}

function mapDispatchToProps (dispatch) {
  return {
    setPosts: (data) => dispatch(setPosts(data)),
    sortPosts: (data) => dispatch(sortPosts(data)),
  }
}
  
function mapStateToProps({ posts }) {
  return {
    posts: posts,
  }
}
  
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostList));
