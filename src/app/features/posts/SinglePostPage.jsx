import { useSelector } from "react-redux"
import { getPostsById } from "./postsSlice"
import ReactionButtons from "./ReactionButtons"
import TimeAgo from "./TimeAgo"
import PostAuthor from "./PostAuthor"

import { useParams } from "react-router-dom"
const SinglePostPage = () => {
  const { postId } = useParams()
  const post = useSelector((state) => getPostsById(state, postId))
  console.log(post)

  return (
    <div className="posts-list">
      <h1>hello there</h1>
      <div className="post-item">
        <div className="post-content">
          <h3>{post.title}</h3>
          <PostAuthor userId={post.userId} />
          <p className="">{post.body}</p>
          <TimeAgo timeStamp={post.date} />
          <ReactionButtons post={post} />
        </div>
        <div>
          {/* <button onClick={() => edit(post)}>Edit</button>
          <button onClick={() => remove(post.id)}>Delete</button> */}
        </div>
      </div>
    </div>
  )
}

export default SinglePostPage
