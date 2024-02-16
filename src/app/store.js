import { configureStore } from "@reduxjs/toolkit"
import counterReducer from "./features/counter/CounterSlice"
import postsReducer from "./features/posts/postsSlice"
import usersReducer from "./features/users/UsersSlice"
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    posts: postsReducer,
    users: usersReducer,
  },
})
