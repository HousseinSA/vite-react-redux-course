import { useSelector } from "react-redux"
import { allUsers } from "../users/UsersSlice"
import TimeAgo from "./TimeAgo"
import ReactionButtons from "./ReactionButtons"
const Post = ({ post, edit, remove }) => {
  const users = useSelector(allUsers)
  const user = users.find((user) => user.id === post.userId)
  return (
    <div className="posts-list">
      <div className="post-item">
        <div className="post-content">
          <h3>{post.title}</h3>
          <span>{user ? user.name : "unknown author"}</span>
          <p className="">{post.body}</p>
          <TimeAgo timeStamp={post.date} />
          <ReactionButtons post={post} />
        </div>
        <div>
          <button onClick={() => edit(post)}>Edit</button>
          <button onClick={() => remove(post.id)}>Delete</button>
        </div>
      </div>
    </div>
  )
}

export default Post
