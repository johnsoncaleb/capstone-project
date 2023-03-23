import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase.config";
import { useNavigate } from "react-router-dom";

export const UpdatePost = () => {
  
  const navigate = useNavigate()

  const { postId } = useParams()
  const [post, setPost] = useState(null)
  const [title, setTitle] = useState('')
  const [text, setText] = useState('')

  useEffect(() => {
    const getPost = async () => {
      const postDoc = await getDoc(doc(db, 'posts', postId))
      if (postDoc.exists()) {
        setPost({...postDoc.data(), id: postDoc.id })
        setTitle(postDoc.data().title)
        setText(postDoc.data().postText)
      }
    }
    getPost()
  }, [postId])

  const handleSubmit = async (event) => {
    event.preventDefault()

    const postDocRef = doc(db, 'posts', post.id)
    const updatedData = { title, postText: text }
    await updateDoc(postDocRef, updatedData)

    setPost({...post, ...updatedData})
    navigate('/')
  }

  return (
    <div className="update-page">
      <h2>Update Post</h2>
      {post && (
        <form onSubmit={handleSubmit}>
          <div className="update-title">
            <label htmlFor="title">Title:</label><br/>
            <input
            id="title"
            type='text'
            value={title}
            onChange={(event) => setTitle(event.target.value)} 
            />
          </div>
          <div className="update-text">
            <label htmlFor="text">Write here: </label><br/>
            <textarea
            id="text"
            value={text}
            onChange={(event) => setText(event.target.value)}
            style={{ height: "200px" }}
            />
          </div>
          <button className="update-button" type="submit">Save</button>
        </form>
      )}
    </div>
  )

}


