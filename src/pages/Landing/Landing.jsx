import styles from './Landing.module.css'
import { Link } from 'react-router-dom'

const Landing = ({ user }) => {
  return (
    <>
    <section className={styles.landing}>
      <h1> My Diary</h1>
      <img src='https://media.giphy.com/media/xUA7aUjAvcj6w5pxNm/giphy.gif' alt='logo'></img>
      {user ?
        <main className={styles.container}>
        </main>
        :
        <main className={styles.container}>
          <section className={styles.landingSection}>
          <Link to="/login" className='login-btn' id={styles["login-btn"]}>Log In</Link>
          <Link to="/signup" className='signup-btn' id={styles["signup-btn"]}>Sign Up</Link>
          </section>
        </main>
      }
      </section>
    </>
  )
}

export default Landing

