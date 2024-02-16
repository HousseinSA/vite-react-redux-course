import { useSelector, useDispatch } from "react-redux"
import {
  addPost,
  clear,
  removePost,
  editPost,
  selectAllPosts,
  getPostsError,
  getPostsStatus,
  fetchPosts,
} from "./postsSlice"

import { useEffect, useState } from "react"
import Post from "./post"

import { allUsers, getError, getStatus } from "../users/UsersSlice"
const PostsContainer = () => {
  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")
  const [edit, setEdit] = useState(false)
  const [id, setID] = useState("")
  const [userId, setUserId] = useState("")
  const posts = useSelector(selectAllPosts)
  const [reactions, setReactions] = useState({})
  const ordredPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))
  const dispatch = useDispatch()
  const postError = useSelector(getPostsError)
  const postStatus = useSelector(getPostsStatus)
  // users
  const users = useSelector(allUsers)
  const userStatus = useSelector(getStatus)
  const userError = useSelector(getError)

  useEffect(() => {
    if (postStatus === "idle") {
      dispatch(fetchPosts())
    }
  }, [postStatus, dispatch])
  const handleForm = (event) => {
    event.preventDefault()
    if (edit) {
      dispatch(editPost({ id, title, body, userId, reactions }))
    } else {
      dispatch(addPost(title, body, userId))
    }
    setTitle("")
    setBody("")
    setEdit(false)
    setID("")
  }
  const handelEdit = (post) => {
    setEdit(true)
    setTitle(post.title)
    setBody(post.body)
    setID(post.id)
    setReactions(post.reactions)
  }
  const handelDelete = (title) => {
    dispatch(removePost(title))
  }
  // console.log(posts)
  return (
    <div className="post-container">
      <form onSubmit={handleForm} className="post-form">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          type="text"
          placeholder="title"
        />
        <select value={userId} onChange={(e) => setUserId(e.target.value)}>
          {userStatus === "loading" && "loading"}
          {userStatus === "failed" && { userError }}
          {userStatus === "success" &&
            users.map((user) => {
              return (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              )
            })}
        </select>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          name=""
          required
          id=""
          cols="30"
          rows="10"
          placeholder="message"
        ></textarea>
        <button type="submit">{edit ? "Edit post" : "Add Post"}</button>
        <button onClick={() => dispatch(clear())}>Clear All Posts</button>
      </form>
      {postStatus === "loading" && <div>Loading...</div>}
      {postStatus === "failed" && <div>{postError}</div>}
      {postStatus === "success" &&
        ordredPosts.map((post) => {
          return (
            <Post
              key={post.id}
              post={post}
              edit={handelEdit}
              remove={handelDelete}
            />
          )
        })}
    </div>
  )
}

export default PostsContainer
