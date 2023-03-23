import { getDocs, collection, doc, where, query, deleteDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { auth, db } from '../firebase.config';
import { Link, useNavigate } from 'react-router-dom';

export const Profile = (isAuth) => {

    const navigate = useNavigate()

    const [postList, setPostList] = useState([]);
    const postsCollectionRef = collection(db, "posts");
  
    useEffect(() => {
      const getPosts = async () => {
        const q = query(postsCollectionRef, where("author.id", "==", auth.currentUser.uid));
        const data = await getDocs(q);
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
        navigate('/')
      };

    return (
        <div className="profilePage">
          <div className='profile-top'>
            <h1>Your Posts</h1>
            {/* <Link to={'/profile-settings'}>Change Username</Link> */}
          </div>
          {postList.map((post) => {
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
                <h3>@{post.author.name}</h3>
                <p>{new Date(post.timestamp.toDate()).toLocaleString()}</p>
              </div>
            );
          })}
        </div>
      );
}
