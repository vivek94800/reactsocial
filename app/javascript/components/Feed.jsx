import React, { useEffect, useState } from "react";
import axios from "axios";
import Post from "./Post";

//import Post from '../post/Post';
const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

   const token= localStorage.getItem('token');

   const  headers = {
    Authorization: token,
   };

   

    const fetchPosts = async () => {

    
    try {
      const response = await axios.get("/posts", {headers});
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  // const fetchComments = async () => {
  //   try {
  //     const postIds = posts.map((post) => post.id);
  //     const responses = await Promise.all(
  //       postIds.map((postId) => axios.get(`/posts/${postId}/comments`))
  //     );

  //     const updatedPosts = posts.map((post, index) => ({
  //       ...post,
  //       comments: responses[index].data,
  //     }));

  //     setPosts(updatedPosts);
  //   } catch (error) {
  //     console.error('Error fetching comments:', error);
  //   }
  // };

  useEffect(() => {
    fetchPosts();
  }, []);

  // useEffect(() => {
  //   fetchComments();
  // }, [posts]);

  const handleCreatePost = async () => {
    try {
        await axios.post("/posts", {
          title: title, // The title of the post from the state
          content: content, // The content of the post from the state
        }, {headers});
        setTitle("");
        setContent("");
        fetchPosts();
      } catch (error) {
      console.error("Error creating post:", error.message);
      console.log("Error details:", error.response.data); // Log the detailed error response
    }
  };

  return (
    <div className="feed">
      <h1 >Feeds</h1>
      <div>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button  className="button" onClick={handleCreatePost}>Create Post</button>
      </div>
      {Array.isArray(posts) && posts.map((post) => (
        <Post key={post.id} post={post} fetchPosts={fetchPosts} />
      ))}
    </div>
  );
};

export default Feed;