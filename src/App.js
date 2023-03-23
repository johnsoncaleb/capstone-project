import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { Home } from './components/Home';
import { CreatePost } from './components/CreatePost';
import { Login } from './components/Login';
import { useState } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from './firebase.config';
import { UpdatePost } from './components/UpdatePost';
import { Profile } from './components/Profile';
import { ProfileSettings } from './components/ProfileSetting';
import { NewsAPI } from './components/NewsAPI';


function App() {

  const [isAuth, setIsAuth] = useState(false)


  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear()
      setIsAuth(false)
      window.location.pathname = '/login'
    })
  }

  return (
    <Router>

    <nav>

    <Link to='/'>Home</Link>
    {!isAuth ? (
          <Link to="/login"> Login </Link>
        ) : (
          <>
            <Link to="/createpost"> Create Post </Link>
            <Link to='/profile'>Profile</Link>
            <Link to='/news'>News</Link>
            <button className="logout-button" onClick={signUserOut}> Log Out</button>
            
          </>
        )}

    </nav>
      <Routes>
        <Route path='/' element={<Home isAuth={isAuth}/>}></Route>
        <Route path='/createpost' element={<CreatePost isAuth={isAuth}/>}></Route>
        <Route path='/login' element={<Login setIsAuth={setIsAuth}/>}></Route>
        <Route path="/posts/:postId/edit" element={<UpdatePost isAuth={isAuth} />} />
        <Route path='/profile' element={<Profile isAuth={isAuth} />} />
        <Route path='/news' element={<NewsAPI />} />
        {/* <Route path='profile-settings' element={<ProfileSettings isAuth={isAuth}/>} /> */}
      </Routes>

    

    </Router>
  );
}

export default App;
