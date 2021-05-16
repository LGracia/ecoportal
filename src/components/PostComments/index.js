import React from 'react';
import './PostComments.css';

class PostComments extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            comments: [],
            postId: props.postId
        };
    }

    componentDidMount() {
        this.comments();
    }

    isEmpty = () => {
        return this.state.comments.length === 0;
    }

    comments = () => {
        if (!this.isEmpty()) return;

        const commentsUrl = `https://jsonplaceholder.typicode.com/posts/${this.state.postId}/comments`;
        fetch(commentsUrl)
            .then(response => {
                return response.json()
            })
            .then(comments => {
                this.setState({ comments: comments });
            });
    }

    render() {
        if (this.isEmpty()) {
            return (<p>Loading...</p>);
        }
        return (
            this.state.comments.map((comment) => {
                return (
                    <div key={ comment.id } className="commentRow">
                        <div className="author">
                            <p>{ comment.email } / { comment.name }</p>
                        </div>
                        <div className="message">
                            <p>{ comment.body }</p>
                        </div>
                    </div>
                );
            })
        );
    }
}

export default PostComments;
