import { useSelector, useDispatch } from "react-redux"
import {
  addNewPost,
  clear,
  editPost,
  editStatus,
  editPostStatus,
} from "./postsSlice"
import { useState } from "react"
import { allUsers, getError, getStatus } from "../users/UsersSlice"
import { useNavigate } from "react-router-dom"
const PostForm = () => {
  const [addReqeustStatus, setAddRequestStatus] = useState("idle")
  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")
  const [id, setID] = useState("")
  const [userId, setUserId] = useState("")

  const [reactions, setReactions] = useState({})
  const navigate = useNavigate()
  const canSave =
    [title, body, userId].every(Boolean) && addReqeustStatus === "idle"
  const users = useSelector(allUsers)
  const userStatus = useSelector(getStatus)
  const userError = useSelector(getError)
  const dispatch = useDispatch()
  const handleForm = (event) => {
    event.preventDefault()
    if (editStatus) {
      dispatch(editPost({ id, title, body, userId, reactions }))
      navigate("/")
    } else {
      // dispatch(addPost(title, body, Number(userId)))
      try {
        setAddRequestStatus("loading")
        dispatch(addNewPost({ title, body, userId }))
        navigate("/")
      } catch (error) {
        console.log("failed to add post")
      } finally {
        setAddRequestStatus("idle")
      }
    }
    setTitle("")
    setBody("")
    dispatch(editPostStatus(false))
    setID("")
  }
  return (
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
          users?.map((user) => {
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
      <button type="submit" disabled={!canSave}>
        {editPostStatus ? "Edit post" : "Add Post"}
      </button>
      <button onClick={() => dispatch(clear())}>Clear All Posts</button>
    </form>
  )
}

export default PostForm
