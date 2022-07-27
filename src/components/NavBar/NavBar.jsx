import { Link } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import styles from './NavBar.module.css'

const NavBar = ({ user, handleLogout }) => {
  return (
    <>
    <header className="App-header">
      {user ?
        <nav>
          <NavLink to="/">My Diary Home</NavLink>
          <NavLink to="/reference">Things to Reference</NavLink>
            <NavLink to="/addReference">Add Reference</NavLink>
            <NavLink to="/code">Things to Code</NavLink>
            <NavLink to="/addCode">Add Code</NavLink>
            <div className={styles.dropdown}>
              <p className={styles.dropbtn}>Account</p>
              <div className={styles.dropdownContent}>
                <Link to="" onClick={handleLogout}>LOG OUT</Link>
                <NavLink to="/changePassword">Change Password</NavLink>
              </div>
            </div>
        </nav>
      :
        <></> 
      }
      </header>
    </>
  )
}

export default NavBar
