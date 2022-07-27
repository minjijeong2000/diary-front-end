import styles from './CodeDetails.module.css'
import CodeCard from "../../components/CodeCard/CodeCard"
import {useLocation} from 'react-router-dom'
import { Link, NavLink } from "react-router-dom"
import { useEffect, useState} from "react"



function PostDetails (props) {
  const location = useLocation()
  const [post, setPost] = useState(location.state.post)
  
  useEffect(()=> {
    setPost(props.posts.filter(post => post._id === location.state.post._id)[0])
  }, [props.posts])
  
  return (
    <>
      <h1>Post Details</h1>
        <CodeCard 
          key={post._id}
          post={post}
          title={post.title}
          user={props.user}
        />
        <br />
        {props.user?.profile === post.author?._id &&
          <div>
            <Link
              state={{post}}
              to="/edit"
              className={styles.editBtn}
            >
              Edit
            </Link>
            <NavLink to="/code">
              <button className={styles.deleteBtn} onClick={() => props.handleDeletePost(post._id)}>
                Delete
              </button>
            </NavLink>
          </div>
        }
    </>
  )
}
export { PostDetails }