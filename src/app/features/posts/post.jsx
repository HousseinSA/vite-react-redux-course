import TimeAgo from "./TimeAgo"
import PostAuthor from "./PostAuthor"
import ReactionButtons from "./ReactionButtons"
import { Link } from "react-router-dom"
const Post = ({ post, edit, remove }) => {
  return (
    <div className="posts-list">
      <div className="post-item">
        <div className="post-content">
          <h3>{post.title}</h3>
          <p className="">{post.body.substring(0, 75) + "..."}</p>
          <PostAuthor userId={post.userId} />
          <Link to={`/post/${post.id}`}>View Post</Link>
          <TimeAgo timeStamp={post.date} />
          <ReactionButtons post={post} />
        </div>
        <div>
          {/* <button onClick={() => edit(post)}>Edit</button> */}
          <button onClick={() => remove(post.id)}>Delete</button>
        </div>
      </div>
    </div>
  )
}

export default Post
