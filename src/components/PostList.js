import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom';
import { fetchPosts, votePost, deletePost } from '../utils/api';
import { setPosts, sortPosts } from '../actions/posts';
import './PostList.css';

class PostList extends Component {
  state = {
    posts: null,
    category: ''
  }
  componentDidUpdate() {
    if (((this.props.match && this.props.match.params.category) && (this.state.category === '')) || 
      (this.state.category !== this.props.match.params.category && (this.props.match && this.props.match.params.category)) ||
      (!(this.props.match && this.props.match.params.category) && (this.state.category !== '')))
      this.updateState();
  }
  updateState() {
    if (this.props.match && this.props.match.params.category) {
      this.setState({ category: this.props.match.params.category }, this.getPosts);
    } else {
      this.setState({ category: '' }, this.getPosts);
    }
  }
  getPosts() {
    fetchPosts(this.state.category)
      .then((posts) => this.props.setPosts(posts));
  }
  onChangeSort(e) {
    this.props.sortPosts(e.value);
  }
  componentDidMount() {
    this.updateState();
  }
  navigateToNewPost() {
    this.props.history.push('/create');
  }
  upVote(post) {
    votePost(post, "upVote")
        .then(() => this.getPosts());
  }
  downVote(post) {
    votePost(post, "downVote")
        .then(() => this.getPosts());
  }
  editPost(post) {
    this.props.history.push('/edit/'+post.id);
  }
  deletePost(post) {
    deletePost(post)
        .then(() => this.getPosts());
  }
  render () {
    const posts = this.props.posts.posts;

    if (!posts || !posts.length)
      return (<div className='post-list'><div className="post-menu"><button onClick={() => this.navigateToNewPost()}>New Post</button></div><p>No posts.</p></div>);

    return (
        <div className='post-list'>
          <div className="post-menu">
            <select 
              onChange={event => this.onChangeSort({ value: event.target.value })}>
              <option value="none" disabled>Select</option>
              <option value="date">Sort by date</option>
              <option value="score">Sort by score</option>
            </select>
            <button onClick={() => this.navigateToNewPost()}>New Post</button>
          </div>
          {posts.map((item) => (
              <article key={item.id}>
                <Link to={"/post/" + item.id}>{item.title}</Link>
                <ul>
                  <li><em>{item.author}</em></li>
                  <li>{new Date(item.timestamp).toISOString()}</li>
                  <li>Comments: {item.commentCount}</li>
                  <li>Score: {item.voteScore}
                  <button onClick={() => this.upVote(item)}>Up</button>
                  <button onClick={() => this.downVote(item)}>Down</button></li>
                  <li><button onClick={() => this.editPost(item)}>Edit Post</button></li>
                  <li><button onClick={() => this.deletePost(item)}>Delete Post</button></li>
                </ul>
              </article>
          ))}
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
