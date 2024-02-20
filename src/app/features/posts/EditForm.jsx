import { useSelector, useDispatch } from "react-redux"
import {
  addNewPost,
  clear,
  editPost,
  editStatus,
  editPostStatus,
  getPostById,
} from "./postsSlice"
import { useState } from "react"
import { allUsers, getError, getStatus } from "../users/UsersSlice"
import { useNavigate, useParams } from "react-router-dom"
const EditForm = () => {
  const { postId } = useParams()
  const post = useSelector(getPostById(Number(postId)))
  const [addReqeustStatus, setAddRequestStatus] = useState("idle")
  const [title, setTitle] = useState(post.title || "")
  const [body, setBody] = useState(post.body || "")
  const [id, setID] = useState(post.id || "")
  const [userId, setUserId] = useState(post.userId || "")

  const [reactions, setReactions] = useState({})
  const navigate = useNavigate()
  const canSave =
    [title, body, userId].every(Boolean) && addReqeustStatus === "idle"
  const users = useSelector(allUsers)
  const userStatus = useSelector(getStatus)
  const userError = useSelector(getError)
  const edStatus = useSelector(editStatus)
  const dispatch = useDispatch()
  console.log(edStatus)
  const handleForm = (event) => {
    event.preventDefault()
    if (edStatus) {
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
        {edStatus ? "Edit post" : "Add Post"}
      </button>
      <button onClick={() => dispatch(clear())}>Clear All Posts</button>
    </form>
  )
}

export default EditForm
