import React, { Component } from 'react';
import { withRouter } from 'react-router'
import { fetchPost, votePost, deletePost } from '../utils/api';
import CommentList from './CommentList';
import './PostView.css';

class PostView extends Component {
    state = {
        post: null,
    }
    componentWillMount() {
        this.getPost();
    }
    getPost() {
        let post;

        if ((this.props.posts && this.props.posts.posts) && (this.props.match && this.props.match.params.id)) {
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
    }
    editPost() {
        const post = this.state.post;
        
        this.props.history.push('/edit/'+post.id);
    }
    upVote() {
        const post = this.state.post;

        votePost(post, "upVote")
            .then(() => this.getPost());
    }
    downVote() {
        const post = this.state.post;

        votePost(post, "downVote")
            .then(() => this.getPost());
    }
    deletePost() {
        const post = this.state.post;

        deletePost(post)
            .then(() => this.props.history.push('/'));
    }
    render() {
        const post = this.state.post;
        let dateTime, formatted;

        if (!post || post.error) {
            return (<p>No post.</p>);
        } else {
            dateTime = new Date(post.timestamp);
            formatted = dateTime.toISOString();
        }
    
        return (
            <div className='post-view'>
                <article>
                    <h2>{post.title}</h2>
                    <div className="post-information">
                        <ul>
                            <li>{post.author}</li>
                            <li>{formatted}</li>
                            <li>{post.voteScore}
                            <button onClick={() => this.upVote()}>Up</button>
                            <button onClick={() => this.downVote()}>Down</button></li>
                            <li><button onClick={() => this.editPost()}>Edit Post</button></li>
                            <li><button onClick={() => this.deletePost()}>Delete Post</button></li>
                        </ul>
                    </div>
                    <div class="content">{post.body}</div>
                    <div><CommentList post={post.id} /></div>
                </article>
            </div>
        )
    }
}

export default withRouter(PostView);
