import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Post } from "../components/Post/Post"
import style from "./Home.module.css"

import { fetchPosts, fetchTags } from "../redux/slices/posts"

export const Home: React.FC = () => {
  const dispatch = useDispatch()
  const { posts } = useSelector((state: any) => state.posts)
  const userData = useSelector((state: any) => state.auth.data)
  const isPostsLoading = posts.status === "loading"

  useEffect(() => {
    dispatch(fetchPosts() as any)
    dispatch(fetchTags() as any)
  }, [])

  return (
    <>
      <h2>My film collection</h2>
      <div className={style.container}>
        {(isPostsLoading ? [...Array(5)] : posts.items).map(
          (obj: any, index: any) =>
            isPostsLoading ? (
              <Post isLoading={true} key={index} />
            ) : (
              <Post
                key={obj._id}
                _id={obj._id}
                title={obj.title}
                imageUrl={
                  obj.imageUrl ? `http://localhost:4444${obj.imageUrl}` : ""
                }
                user={obj.user}
                createdAt={obj.createdAt}
                viewsCount={obj.viewsCount}
                tags={obj.tags}
                isEditable={userData?._id === obj?.user?._id}
              />
            )
        )}
      </div>
    </>
  )
}
