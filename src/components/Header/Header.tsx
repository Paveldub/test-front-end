import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"

import { isSelectAuth, logout } from "../../redux/slices/auth"

import styles from "./Header.module.css"

interface UserData {
  createdAt: string
  email: string
  fullName: string
  token: string
  _id: string
  auth: any
}

export const Header: React.FC = () => {
  const isAuth = useSelector(isSelectAuth)
  const userData = useSelector((state: UserData) => state.auth.data)
  const dispatch = useDispatch()

  const onClickLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      dispatch(logout())
      window.localStorage.removeItem("token")
    }
  }

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <div className={styles.inner}>
          <Link className={styles.logo} to="/">
            Home
          </Link>
          <div className={styles.buttons}>
            {isAuth ? (
              <>
                <span>{userData?.fullName}</span>
                <Link to="/add-post">
                  <button className={styles.createArticle}>
                    Create article
                  </button>
                </Link>
                <button className={styles.logout} onClick={onClickLogout}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <button className={styles.login}>Log in</button>
                </Link>
                <Link to="/register">
                  <button className={styles.register}>Register</button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
