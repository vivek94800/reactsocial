import React, { useEffect, useState } from "react";
import axios from "axios";
import Post from "./Post";

//import Post from '../post/Post';
const Feed = ({ onSectionChange }) => {
  const [posts, setPosts] = useState([]);
  const [visibility, setVisibility] = useState("public");
  const[showPrivate, setShowPrivate] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  //const [currentUser, setCurrentUser] = useState(null);

  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  console.log('currentUser:', currentUser);

   const token= localStorage.getItem('token');

   const  headers = {
    Authorization: `Bearer ${token}`,
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
  //   // Fetch the current user data here and update the state
  //   const fetchCurrentUser = async () => {
  //     try {
  //       const response = await axios.get("/current_user", { headers: { Authorization: `Bearer ${token}` } });
  //       setCurrentUser(response.data);
  //     } catch (error) {
  //       console.error("Error fetching current user:", error);
  //     }
  //   };

  //   fetchCurrentUser();
  // }, [headers]);


  // useEffect(() => {
  //   fetchComments();
  // }, [posts]);

  const handleCreatePost = async () => {
    try {
        await axios.post("/posts", {
          title: title, // The title of the post from the state
          content: content,
          visibility: visibility, // The content of the post from the state
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
      <div className="create-post-form">
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
        <button  className="create-post-button" onClick={handleCreatePost}>Create Post</button>
        </div>
        <div className="visibility-options">
          <label>
             <span className="visibility-text">Public</span>&nbsp;
            <input
              type="radio"
              className="visibility-radio"
              value="public"
              checked={visibility === "public"}
              onChange={() => setVisibility("public")}
            />
          </label>
          <label>
          <span className="visibility-text">Private</span>&nbsp;
            <input
              type="radio"
              className="visibility-radio"
              value="private"
              checked={visibility === "private"}
              onChange={() => setVisibility("private")}
            />
          </label>
        </div>
      
      {Array.isArray(posts) && posts.map((post) => (
        <Post key={post.id} post={post} fetchPosts={fetchPosts} showPrivate={showPrivate}  currentUser={currentUser}/>
      ))}
    </div>
  );
};

export default Feed;