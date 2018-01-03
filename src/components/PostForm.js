import React, { Component } from 'react';
import { withRouter } from 'react-router'
import { connect } from 'react-redux';
import { fetchPosts, fetchPost, updatePost } from '../utils/api';
import { setPosts } from '../actions/posts';
import { uuidv4 } from '../utils/helpers';
import './PostForm.css';

class PostForm extends Component {
    state = {
        post: null,
    }
    componentWillMount() {
        let post = { id: 0, title: '', author: '', body: '', category: '', timestamp: 0};

        if (this.props.posts.posts && (this.props.match && this.props.match.params.id)) {
            post = this.props.posts.posts.filter((post) => post.id === this.props.match.params.id)[0];

            if (post) {
                this.setState({ post });
                return;
            }
        } else {
            if (this.props.match && this.props.match.params.id) {
                fetchPost(this.props.match.params.id)
                    .then((post) => this.setState({ post } ));
                return;
            }
        }

        this.setState({ post });
    }
    setTitle(title) {
        this.setState(
            { post: {
                ...this.state.post,
                title: title }
            });
    }
    setBody(body) {
        this.setState(
            { post: {
                ...this.state.post,
                body: body }
            });
    }
    setCategory(category) {
        this.setState(
            { post: {
                ...this.state.post,
                category: category }
            });
    }
    setAuthor(author) {
        this.setState(
            { post: {
                ...this.state.post,
                author: author }
            });
    }
    savePost() {
        const post = this.state.post;

        if (!post.id) {
            post.id = uuidv4();
            post.timestamp = Date.now();
        }

        updatePost(post)
            .then(() => {
                fetchPosts()
                .then((posts) => this.props.setPosts(posts));

                this.props.history.push('/');
            });
    }
    render () {
        const categories = this.props.categories.categories;
        const post = this.state.post;

        if (!post)
            return (<p>No post.</p>);

        return (
            <div className='post-form'>
                    <input type="text" name="title" placeholder="Title:" defaultValue={post.title} 
                        onChange={(event) => this.setTitle(event.target.value)} />
                    <textarea name="body" placeholder="Body:" defaultValue={post.body} 
                        onChange={(event) => this.setBody(event.target.value)} />
                    <select defaultValue={post.category}
                        onChange={(event) => this.setCategory(event.target.value)} >
                        <option value="none" disabled>Category</option>
                        {categories && categories.map((item) => (
                            <option value={item.name} key={item.name}>{item.name}</option>
                        ))}
                    </select>
                    <input type="text" name="author" placeholder="Author:" defaultValue={post.author} 
                        onChange={(event) => this.setAuthor(event.target.value)} />
                    <button onClick={() => this.savePost()}>Save</button>
                    <button onClick={() => this.props.history.goBack()}>Cancel</button>
            </div>
        )
    }
}

function mapDispatchToProps (dispatch) {
    return {
        setPosts: (data) => dispatch(setPosts(data)),
    }
}
    
function mapStateToProps({ categories, posts }) {
    return {
        categories,
        posts
    }
}
  
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostForm));
