import React from 'react';
import './App.css';
import PostsContainer from './components/PostsContainer/index';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { posts: [] };
    }

    componentDidMount() {
        this.posts();
    }

    isEmpty = () => {
        return this.state.posts.length === 0;
    }

    posts = () => {
        if (!this.isEmpty()) return;

        const postsUrl = 'https://jsonplaceholder.typicode.com/posts';
        fetch(postsUrl)
            .then(response => {
                return response.json()
            })
            .then(posts => {
                this.setState({ posts: posts });
            });
    }

    render() {
        return (
            <div className="App">
                <div className="App-body">
                    <h1>Posts</h1>
                    { this.isEmpty() ? (<p>Loading...</p>) : (<PostsContainer posts={this.state.posts}/>) }
                </div>
            </div>
        );
    }
}

export default App;
