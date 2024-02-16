// import { useDispatch, useSelector } from "react-redux"
// import { allUsers } from "./UsersSlice"
// import { useState } from "react"
// import {addUser} from './UsersSlice'
// const Users = () => {
//   const users = useSelector(allUsers)
//   const dispatch = useDispatch()
//   const [userID, setuserID] = useState("")
//  constzz
//   return (
//     <div className="flex items-center gap-3">
//       <div>
//         <input type="text" />
//         <button onClick={()=>dispatch(addUser())}>add author</button>
//       </div>
//       <select value={userID} onChange={(e) => setuserID(e.target.value)}>
//         {users.map((user) => {
//           return (
//             <option key={user.id} value={user.id}>
//               {user.name}
//             </option>
//           )
//         })}
//       </select>
//     </div>
//   )
// }

// export default Users
