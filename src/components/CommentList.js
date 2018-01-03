import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchComments, voteComment } from '../utils/api';
import { setComments } from '../actions/comments';
import CommentForm from './CommentForm';
import './CommentList.css';

class CommentList extends Component {
    state = {
        comments: null,
    }
    getComments() {
        if (this.props.post)
            fetchComments(this.props.post)
                .then((comments) => this.props.setComments(comments));
    }
    componentDidMount() {
        this.getComments();
    }
    editComment(e) {
        e.preventDefault();
        const comments = this.props.comments;
        comments.map((comment) => comment.id === e.target.getAttribute('href') ? comment.edit = true : null);
        this.props.setComments(comments);
    }
    upVote(comment) {
        voteComment(comment, "upVote")
            .then(() => this.getComments());
    }
    downVote(comment) {
        voteComment(comment, "downVote")
            .then(() => this.getComments());
    }
    render () {
        const comments = this.props.comments,
            post = this.props.post;

        if (!comments || !comments.length)
            return (<div className='comment-list'><h3>Comments</h3><CommentForm post={post} /><p>No comments.</p></div>);

        return (
            <div className='comment-list'>
                <h3>Comments</h3>
                <CommentForm post={post} />
                <ul>
                    {comments.map((item) => (
                        <li key={item.id}>
                            {item.body}
                            <p><em>{item.author}</em></p>
                            <ul>
                                <li>
                                    <Link to={item.id} onClick={(e) => this.editComment(e)}>Edit</Link>
                                </li>
                                <li>{item.voteScore}
                                    <button onClick={() => this.upVote(item.id)}>Up</button>
                                    <button onClick={() => this.downVote(item.id)}>Down</button>
                                </li>
                            </ul>
                            {item.edit && <CommentForm comment={item} post={post} />}
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}

function mapDispatchToProps (dispatch) {
    return {
      setComments: (data) => dispatch(setComments(data)),
    }
}
    
function mapStateToProps({ comments }) {
    return {
      comments: (comments.comments) ? 
        comments.comments.map((comment) => { comment.edit = comment.edit || false; return comment } ) : 
        comments,
    }
  }
  
export default connect(mapStateToProps, mapDispatchToProps)(CommentList);
