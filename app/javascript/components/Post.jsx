import React, { useState, useEffect } from "react";
import axios from "axios";
import { MoreVert } from "@mui/icons-material";
//import "./post.css"
//import { useState } from "react";
//import { Users } from "../dummyData";
import person from "./images/person.png";
import liak from "./images/liak.png";
//import Users from "./Users";

const Post = ({ post, fetchPosts }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [like, setLike] = useState(post.likes || 0);
  const [isLiked, setIsLiked] = useState(post.isLiked || false);
  const [comments, setComments] = useState(post.comments || []);
  const [newComment, setNewComment] = useState("");
  const [username, setUsername] = useState("");


  

  const token= localStorage.getItem('token');

   const  headers = {
    Authorization: token,
   };


   useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`/users/${post?.user_id}`, { headers });

        setUsername(response.data.username);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, [post, headers]);


  const handleUpdatePost = async () => {
    try {
      await axios.patch(`/posts/${post.id}`, { title, content }, {headers});
      fetchPosts();
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  const handleDeletePost = async () => {
    try {
      await axios.delete(`/posts/${post.id}`, {headers});
      fetchPosts();
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const likeHandler = async () => {
    try {
      if (isLiked) {
        await axios.delete(`/likes/${post.id}`, {headers});
        setLike((prevLike) => prevLike - 1);
      } else {
        await axios.post(`/likes/${post.id}`, {headers});
        setLike((prevLike) => prevLike + 1);
      }
      setIsLiked(!isLiked);
    } catch (error) {
      console.error("Error handling like:", error);
    }
  };

  const handleAddComment = async () => {
    try {
      const response = await axios.post(`/comments/${post.id}`, {
        content: newComment,
      }, {headers});
      setComments([...comments, response.data]);
      setNewComment("");
    //   const updatedPost = { ...post, comments: [...comments, response.data] };
    // fetchPosts(updatedPost);
    fetchPosts();
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await axios.delete(`/comments/${post.id}/${commentId}`, {headers});
      fetchPosts(); // Update the state in the parent component
  } catch (error) {
    console.error("Error deleting post:", error);
  }
  };
  const renderComments = () => {
    return post.comments.map((comment) => (
      <div key={comment.id}>
        <p>{comment.content}</p>
        <button className="button" onClick={() => handleDeleteComment(comment.id)}>
          Delete Comment
        </button>
      </div>
    ));
  };

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <img src={person} alt="" className="postProfileImg" />
            <span className="postUsername">{username}</span>
              {/* {Users.filter((u) => u.id === post?.userId)[0].username} */}
            {/* </span> */}
            {/* <span className="postDate">{post.date} </span> */}
          </div>
          <div className="postTopCenter">
            {isEditing ? (
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            ) : (
              post.title
            )}
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
          {isEditing ? (
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          ) : (
            <span className="postText">{post?.content} </span>
          )}
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img
              src={liak}
              onClick={likeHandler}
              alt=""
              className={`postProfileImg ${isLiked ? "liked" : ""}`}
            />
            <span className="postLikeCounter">
              {like} {like === 1 ? "person" : "people"} liked it
            </span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">
              {comments.length} {comments.length === 1 ? "comment" : "comments"}
            </span>
          </div>
        </div>
      </div>
      {isEditing ? (
        <div>
          <button className="button" onClick={handleUpdatePost}>Save</button>
          <button className="button" onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      ) : (
        <div>
          <button className="button" onClick={() => setIsEditing(true)}>Edit</button>
          <button className="button" onClick={handleDeletePost}>Delete</button>
        </div>
      )}

      <div className="comment">
        
      {renderComments()}
      </div>
      <div className="comment">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button className="button" onClick={handleAddComment}>Add Comment</button>
      </div>
    </div>
  );
};

export default Post;