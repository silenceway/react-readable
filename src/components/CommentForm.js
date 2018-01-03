import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchComments, updateComment } from '../utils/api';
import { uuidv4 } from '../utils/helpers';
import { setComments } from '../actions/comments';

class CommentForm extends Component {
    state = {
        comment: null,
    }
    setBody(body) {
        this.setState(
            { comment: {
                ...this.state.comment,
                body: body }
            });
    }
    setAuthor(author) {
        this.setState(
            { comment: {
                ...this.state.comment,
                author: author }
            });
    }
    saveComment() {
        const comment = this.state.comment,
            newId = comment.id ? comment.id : uuidv4(),
            newComment = { id: 0, author: '', body: '', timestamp: 0, parentId: ''};

        if (!comment.id) {
            comment.id = newId;
            comment.timestamp = Date.now();
            comment.parentId = this.props.post;
            this.setState({ comment: newComment });
        }

        updateComment(comment)
            .then(() => {
                fetchComments(this.props.post)
                .then((comments) => { 
                    comments.map((comment) => comment.id === newId ? comment.edit = false : null);
                    this.props.setComments(comments)
                });
            });
    }
    componentWillMount() {
        const comment = { id: 0, author: '', body: '', timestamp: 0, parentId: ''};

        if (this.props.comment)
            this.setState({ comment: this.props.comment });
        else
            this.setState({ comment: comment });
    }
    render () {
        const comment = this.state.comment;

        return (
            <div className='comment-form'>
                <textarea defaultValue={comment.body} value={comment.body} name="body" placeholder="Body:" required={true}
                    onChange={(event) => this.setBody(event.target.value)} />
                <input defaultValue={comment.author} value={comment.author} name="author" placeholder="Author:" required={true}
                    onChange={(event) => this.setAuthor(event.target.value)} />
                <button onClick={() => this.saveComment()}>Save</button>
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
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentForm);
