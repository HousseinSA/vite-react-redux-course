import { useDispatch } from "react-redux"
import { reactionAdded } from "./postsSlice"
const ReactionButtons = ({ post }) => {
  const dispatch = useDispatch()
  const reactionButton = {
    thumpUP: "👍",
    wow: "😲",
    heart: "❤️",
    rocket: "🚀",
    coffee: "☕",
  }
  return (
    <div>
      {Object.entries(reactionButton).map(([name, emoji]) => {
        return (
          <button
            onClick={() =>
              dispatch(reactionAdded({ postId: post.id, reaction: name }))
            }
            key={name}
          >
            {emoji}
            {post.reactions[name]}
          </button>
        )
      })}
    </div>
  )
}

export default ReactionButtons
