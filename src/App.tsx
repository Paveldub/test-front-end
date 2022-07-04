import { useEffect } from "react"
import { Route, Routes } from "react-router-dom"
import { useDispatch } from "react-redux"

import { Header } from "./components/Header/Header"
import { Login } from "./pages/Login/Login"
import { Registration } from "./pages/Registration/Registration"
import { Home } from "./pages/Home"
import { AddPost } from "./pages/AddPost/AddPost"
import { FullPost } from "./pages/FullPost"

import { fetchAuthMe } from "./redux/slices/auth"

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchAuthMe() as any)
  }, [])

  return (
    <>
      <Header />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts/:id/edit" element={<AddPost />} />
          <Route path="/posts/:id" element={<FullPost />} />
          <Route path="/add-post" element={<AddPost />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
        </Routes>
      </div>
    </>
  )
}

export default App
