import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
const UserUrl = "https://jsonplaceholder.typicode.com/users"

export const fetchUsers = createAsyncThunk("users/fetchusers", async () => {
  try {
    const response = await axios.get(UserUrl)
    return [...response.data]
  } catch (error) {
    return error.message
  }
})

const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    status: "idle",
    error: [],
  },
  reducers: {
    addUser: {
      reducer(state, action) {
        state.users.push(action.payload)
      },
      prepare(name) {
        return {
          payload: {
            id: nanoid(),
            name,
          },
        }
      },
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.status = "success"
      state.users = action.payload
    })
  },
})

export const allUsers = (state) => state.users.users
export const getStatus = (state) => state.users.status
export const getError = (state) => state.users.error
export const { addUser } = usersSlice.actions
export default usersSlice.reducer
