import React, { Component } from 'react';
import { withRouter } from 'react-router'
import { fetchPost } from '../utils/api';

class PostView extends Component {
    state = {
        post: null,
    }
    componentWillMount() {
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
    render () {
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
                        <li>{post.voteScore}</li>
                    </ul>
                </div>
                <div>{post.body}</div>
            </div>
        )
    }
}
  
export default withRouter(PostView);
