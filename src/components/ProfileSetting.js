import React, { useState } from "react";
import { updateDoc, doc } from "firebase/firestore";
import { db, auth } from "../firebase.config";
import { useNavigate } from "react-router-dom";
import { getDocs, getDoc, setDoc } from "firebase/firestore";
import { query, where, collection } from "firebase/firestore";

export const ProfileSettings = () => {

  const navigate = useNavigate()

  const [username, setUsername] = useState("");

  const handleChange = (event) => {
    setUsername(event.target.value);
  };

  const handleSubmit = async (event) => {

    // Get all posts by the current user
const postsQuerySnapshot = await getDocs(
  query(collection(db, "posts"), where("author.id", "==", auth.currentUser.uid))
);

// Update the username field in each post
const batch = db.batch();
postsQuerySnapshot.docs.forEach((doc) => {
  const postRef = doc(db, "posts", doc.id);
  batch.update(postRef, {
    "author.username": username,
  });
});
await batch.commit();


    event.preventDefault();
  
    const userDocRef = doc(db, "users", auth.currentUser.uid);
  
    // Check if the user already has a document in the users collection
    const userDocSnapshot = await getDoc(userDocRef);
  
    if (userDocSnapshot.exists()) {
      // If the user document already exists, update the name field
      await updateDoc(userDocRef, {
        username: username,
      });
    } else {
      // If the user document doesn't exist, create a new document with the name field
      await setDoc(userDocRef, {
        username: username,
      });
    }
  
    setUsername("");
    navigate("/profile");
  };
  
  

  return (
    <div className="profileSettings">
      <form onSubmit={handleSubmit}>
        <label>
          Change Username:
          <input type="text" value={username} onChange={handleChange} />
        </label>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

