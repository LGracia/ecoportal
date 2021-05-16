import React from 'react';
import './PostContainer.css';
import PostComments from '../PostComments/index.js';

class PostsContainer extends React.Component {
    render() {
        return (
            this.props.posts.map((post) => {
                return (
                    <div key={ post.id } className="postCard">
                        <div className="title titleCard">
                            <h3>{ post.title }</h3>
                        </div>
                        <div className="postBody">
                            <div className="postMessage">
                                <p>{ post.body }</p>
                            </div>
                            <div className="postComments">
                                <h3 className="title">Comments</h3>
                                <PostComments postId={post.id} />
                            </div>
                        </div>
                    </div>
                )
            })
        );
    }
}

export default PostsContainer;
