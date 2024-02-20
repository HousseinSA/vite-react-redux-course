import { useDispatch, useSelector } from "react-redux"
import { getPostById, removePost, editPostStatus } from "./postsSlice"
import ReactionButtons from "./ReactionButtons"
import TimeAgo from "./TimeAgo"
import PostAuthor from "./PostAuthor"

import { Link, useParams } from "react-router-dom"
const SinglePostPage = () => {
  const { postId } = useParams()
  const post = useSelector(getPostById(Number(postId)))
  const dispatch = useDispatch()
  return (
    <div className="posts-list">
      <div className="post-item">
        <div className="post-content">
          <h3>{post.title}</h3>
          <PostAuthor userId={post.userId} />
          <p className="">{post.body}</p>
          <TimeAgo timeStamp={post.date} />
          <ReactionButtons post={post} />
        </div>
        <div>
          <Link to={`/edit/${post.id}`}>
            <button
              onClick={() => {
                dispatch(editPostStatus(true))
              }}
            >
              Edit
            </button>
          </Link>
          <button onClick={() => removePost(post.id)}>Delete</button>
        </div>
      </div>
    </div>
  )
}

export default SinglePostPage
