import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db, auth } from '../firebase.config'
import { useNavigate } from 'react-router-dom'

export const CreatePost = ({isAuth}) => {

  const [title, setTitle] = useState('')
  const [postText, setPostText] = useState('')

  const postsCollectionsRef = collection(db, 'posts') 

  let navigate = useNavigate()

  const createPost = async () => {
    await addDoc(postsCollectionsRef, {
      title, 
      postText, 
      author: {name: auth.currentUser.displayName, id: auth.currentUser.uid},
      timestamp: serverTimestamp() 
    });
    navigate('/')
  }

  useEffect(() => {
    if (!isAuth) {
      navigate('/login')
    }
  })

  return (
    <div className='createPostPage'>
      <div className='cpContainer'>
        <h1>Create a Post</h1>
        <div className='inputGp'>
          <label>Title: </label>
          <input placeholder='Title...' onChange={(event) => {setTitle(event.target.value)}}/>
        </div>
        <div className='inputGp'>
          <label>Post: </label>
          <textarea placeholder='Your post here...' onChange={((event) => {setPostText(event.target.value)})}/>
        </div>
        <button onClick={createPost}>Submit Post</button>
      </div>
    </div>
  )
}
