import './App.css'
import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'
import NavBar from './components/NavBar/NavBar'
import Signup from './pages/Signup/Signup'
import Login from './pages/Login/Login'
import Landing from './pages/Landing/Landing'
import Profiles from './pages/Profiles/Profiles'
import ChangePassword from './pages/ChangePassword/ChangePassword'
import Code from './pages/Code/Code'
import AddCode from './pages/AddCode/AddCode'
import AddReference from './pages/AddReference/AddReference'
import ReferenceList from './pages/ReferenceList/ReferenceList'
import EditPost from './pages/EditCode/EditCode'
import * as authService from './services/authService'
import * as postService from './services/postService'
import * as referenceService from './services/referenceService'
import { PostDetails}   from './pages/CodeDetails/CodeDetails'


const App = () => {
  const [user, setUser] = useState(authService.getUser())
  const [posts, setPosts] = useState([])
  const [references, setReferences] = useState([])
  const navigate = useNavigate()

  const handleLogout = () => {
    authService.logout()
    setUser(null)
    navigate('/')
  }

  const handleSignupOrLogin = () => {
    setUser(authService.getUser())
  }

  const handleAddPost = async (newPostData) => {
    const newPost = await postService.create(newPostData)
    setPosts([...posts, newPost])
    navigate('/code')
  }

  const handleAddReference = async (newReferenceData, photo) => {
    const newReference = await referenceService.create(newReferenceData)
    if (photo) {
      newReference.photo = await referencePhotoHelper(photo, newReference._id)
    }
    setReferences([...references, newReference])
    navigate('/reference')
  }

  useEffect(() => {
    const fetchPosts = async () => {
      const postData = await postService.getAll()
      setPosts(postData)
    }
    fetchPosts()
  }, [])

  useEffect(() => {
    const fetchReferences = async () => {
      const referenceData = await referenceService.getAll()
      setReferences(referenceData)
    }
    fetchReferences()
  }, [])

  const handleUpdatePost = async (updatedPostData) => {
    const updatedPost = await postService.update(updatedPostData)
    const newPostsArray = posts.map(post =>
      post._id === updatedPost._id ? updatedPost : post)

    setPosts(newPostsArray)
    navigate('/code')
  }

  const handleDeletePost = async id => {
    const deletedPost = await postService.deleteOne(id)
    setPosts(posts.filter(post => post._id !== deletedPost._id))
  }
  const handleDeleteReference = async id => {
    const deletedReference = await referenceService.deleteOne(id)
    setReferences(references.filter(reference => reference._id !== deletedReference._id))
  }

  const referencePhotoHelper = async (photo, id) => {
    const photoData = new FormData()
    photoData.append('photo', photo)
    return await referenceService.addPhoto(photoData, id)
  }

  return (
    <>
      <NavBar user={user} handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Landing user={user} />} />
        <Route
          path="/signup"
          element={<Signup handleSignupOrLogin={handleSignupOrLogin} />}
        />
        <Route
          path="/login"
          element={<Login handleSignupOrLogin={handleSignupOrLogin} />}
        />
        <Route
          path="/profiles"
          element={user ? <Profiles /> : <Navigate to="/login" />}
        />
        <Route
          path="/changePassword"
          element={
            user ? (
              <ChangePassword handleSignupOrLogin={handleSignupOrLogin} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
            path="/code"
            element={user ? 
              <Code posts={posts} user={user} handleDeletePost={handleDeletePost} /> : 
              <Navigate to="/login" />}/>
        <Route 
            path="/addCode" 
            element={<AddCode handleAddPost={handleAddPost} />}/>
        <Route 
            path="/addReference" 
            element={<AddReference handleAddReference={handleAddReference} />}/>
        <Route 
            path="/reference" 
            element={<ReferenceList handleDeleteReference={handleDeleteReference} 
            references={references}
            user={user} />}/>
        <Route 
            path='/edit' 
            element={<EditPost user={user} handleUpdatePost={handleUpdatePost}/>}/>
        <Route 
              path="/code/:postId"
              element={<PostDetails user={user} posts={posts} handleUpdatePost={handleUpdatePost} handleDeletePost={handleDeletePost}/>}/>
      </Routes>
      
    </>
  )
}

export default App
