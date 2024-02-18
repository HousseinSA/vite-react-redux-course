import { useSelector } from "react-redux"
import { allUsers } from "../users/UsersSlice"
const PostAuthor = ({ userId }) => {
  const users = useSelector(allUsers)

  const user = users.find((user) => user.id === userId)

  return <span>{user ? user.name : "unknown author"}</span>
}

export default PostAuthor
