import React, { useEffect, useState } from "react";
import { getDoc, getDocs, collection, deleteDoc, doc, orderBy, query } from "firebase/firestore";
import { auth, db } from "../firebase.config";
import { Link } from "react-router-dom";

export const Home = ({ isAuth }) => {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const getUserDoc = async () => {
      const userDocRef = doc(db, "users", auth.currentUser.uid);
      const userDocSnapshot = await getDoc(userDocRef);
      if (userDocSnapshot.exists()) {
        setUsername(userDocSnapshot.data().username);
      }
    };

    getUserDoc();
  }, []);

  const [postLists, setPostList] = useState([]);
  const postsCollectionRef = collection(db, "posts");

  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(query(postsCollectionRef, orderBy("timestamp", "desc")));
      const posts = data.docs.map((doc) => {
        const post = { ...doc.data(), id: doc.id };
        if (!post.timestamp) {
          post.timestamp = { toDate: () => new Date() };
        };
        return post;
      });
      setPostList(posts);
    };

    getPosts();
  }, []);

  const deletePost = async (id) => {
    const postDoc = doc(db, "posts", id);
    await deleteDoc(postDoc);

    const updatedData = await getDocs(postsCollectionRef);
    const updatedPostList = updatedData.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

    setPostList(updatedPostList);
  };

  return (
    <div className="homePage">
      {postLists.map((post) => {
        return (
          <div key={post.id} className="post">
            <div className="postHeader">
              <div className="title">
                <h1> {post.title}</h1>
              </div>
              <div className="deleteAndEditButtons">
              {isAuth && post.author && post.author.id === auth.currentUser.uid && (
              <button
              onClick={() => {
              deletePost(post.id);
              }}
              >
              🗑️;
              </button>
              )}
              {isAuth && post.author && post.author.id === auth.currentUser.uid && (
              <Link to={`/posts/${post.id}/edit`}>✏️</Link>
              )}
            </div>
            </div>
            <div className="postTextContainer"> {post.postText} </div>
            {post.author && <h3>@{post.author.name}</h3>}
            <p>{new Date(post.timestamp.toDate()).toLocaleString()}</p>
            
          </div>
        );
      })}
    </div>
  );
};

