import React, { Component } from 'react';
import { withRouter } from 'react-router'
import { fetchPost, votePost } from '../utils/api';

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
    render() {
        const post = this.state.post;
        let dateTime, formatted;
        if (post) {
            dateTime = new Date(post.timestamp);
            formatted = dateTime.toISOString();
        }

        if (!post)
            return (<p>No posts.</p>);

        return (
            <div className='post-view'>
                <h2>{post.title}</h2>
                <div>
                    <ul>
                        <li>{post.author}</li>
                        <li>{formatted}</li>
                        <li>{post.voteScore}
                        <button onClick={() => this.upVote()}>Up</button>
                        <button onClick={() => this.downVote()}>Down</button></li>
                        <li><button onClick={() => this.editPost()}>Edit</button></li>
                    </ul>
                </div>
                <div>{post.body}</div>
            </div>
        )
    }
}
  
export default withRouter(PostView);
