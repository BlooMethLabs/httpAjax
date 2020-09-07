import React, { Component } from 'react';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';
import axios from 'axios';

class Blog extends Component {
  state = {
    selectedPostId: null,
    posts: [],
    error: false,
  };

  componentDidMount() {
    axios
      .get('/posts')
      .then((response) => {
        const posts = response.data.slice(0, 4);
        const updatedPosts = posts.map((post) => {
          return {
            ...post,
            author: 'Barry',
          };
        });
        this.setState({ posts: updatedPosts });
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
        this.setState({ error: true });
      });
  }

  postSelectedHandler = (id) => {
    this.setState({ selectedPostId: id });
  };

  render() {
    let posts = <p style={{ textAlign: 'center' }}>An error occurred.</p>;
    if (!this.state.error) {
      posts = this.state.posts.map((post) => (
        <Post
          title={post.title}
          key={post.id}
          author={post.author}
          clicked={() => this.postSelectedHandler(post.id)}
        ></Post>
      ));
    }

    return (
      <div>
        <section className="Posts">{posts}</section>
        <section>
          <FullPost id={this.state.selectedPostId} />
        </section>
        <section>
          <NewPost />
        </section>
      </div>
    );
  }
}

export default Blog;
