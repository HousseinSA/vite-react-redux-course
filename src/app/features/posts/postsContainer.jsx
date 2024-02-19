import { useSelector, useDispatch } from "react-redux"
import {
  removePost,
  selectAllPosts,
  getPostsError,
  getPostsStatus,
  fetchPosts,
} from "./postsSlice"

import { useEffect } from "react"
import Post from "./post"
const PostsContainer = () => {
  const posts = useSelector(selectAllPosts)
  const ordredPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))
  const dispatch = useDispatch()
  const postError = useSelector(getPostsError)
  const postStatus = useSelector(getPostsStatus)
  // users data

  useEffect(() => {
    if (postStatus === "idle") {
      dispatch(fetchPosts())
    }
  }, [postStatus, dispatch])

  const handelDelete = (id) => {
    dispatch(removePost(id))
  }
  console.log(ordredPosts)
  return (
    <div className="post-container">
      <h1 style={{ marginTop: "1rem", fontFamily: "sans-serif" }}>
        Create Post
      </h1>
      {postStatus === "loading" && <div>Loading...</div>}
      {postStatus === "failed" && <div>{postError}</div>}
      {postStatus === "success" &&
        ordredPosts.map((post, index) => {
          return (
            <Post
              key={index}
              post={post}
              // edit={handelEdit}

              remove={handelDelete}
            />
          )
        })}
    </div>
  )
}

export default PostsContainer
