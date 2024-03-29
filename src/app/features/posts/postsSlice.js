import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit"
import { sub } from "date-fns"
import axios from "axios"
const POSTUrl = "https://jsonplaceholder.typicode.com/posts"

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  try {
    const response = await axios.get(POSTUrl)
    return response.data
  } catch (error) {
    return error.message
  }
})
export const addNewPost = createAsyncThunk(
  "posts/addNewPosts",
  async (initialPost) => {
    try {
      const response = await axios.post(POSTUrl, initialPost)
      return response.data
    } catch (error) {
      return error.message
    }
  }
)
const postsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    status: "idle",
    error: [],
    editPost: false,
  },
  reducers: {
    addPost: {
      reducer(state, action) {
        state.posts.push(action.payload)
      },
      prepare(title, body, userId) {
        return {
          payload: {
            id: nanoid(),
            title,
            body,
            userId,
            date: new Date().toISOString(),
            reactions: {
              thumpUP: 0,
              wow: 0,
              heart: 0,
              rocket: 0,
              coffee: 0,
            },
          },
        }
      },
    },
    removePost: (state, action) => {
      state.posts = state.posts.filter((post) => post.id !== action.payload)
    },
    clear: (state) => {
      state.posts = []
    },
    editPost: (state, action) => {
      state.posts = state.posts.map((post) =>
        post.id === action.payload.id
          ? { ...action.payload, userId: Number(action.payload.userId) }
          : post
      )
    },
    reactionAdded: (state, action) => {
      const { postId, reaction } = action.payload
      const post = state.posts.find((post) => post.id === postId)

      if (post) {
        post.reactions[reaction]++
      }
    },
    editPostStatus: (state, action) => {
      state.editPost = action.payload
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = "loading"
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "success"
        // add time and reactions
        let min = 1
        const loadedPosts = action.payload.map((post) => {
          post.date = sub(new Date(), { minutes: min++ }).toISOString()
          post.reactions = {
            thumpUP: 0,
            wow: 0,
            heart: 0,
            rocket: 0,
            coffee: 0,
          }
          return post
        })
        state.posts = loadedPosts
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        return state.status === "failed"
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        action.payload.userId = Number(action.payload.userId)
        action.payload.date = new Date().toISOString()
        action.payload.reactions = {
          thumpUP: 0,
          wow: 0,
          heart: 0,
          rocket: 0,
          coffee: 0,
        }
        state.posts.push(action.payload)
      })
  },
})
export const {
  addPost,
  removePost,
  clear,
  editPost,
  reactionAdded,
  editPostStatus,
} = postsSlice.actions
export const selectAllPosts = (state) => state.posts.posts
export const getPostsStatus = (state) => state.posts.status
export const getPostsError = (state) => state.posts.error
export const editStatus = (state) => state.posts.editPost
// Selector to retrieve a post by ID
export const getPostById = (postId) => (state) => {
  return state.posts.posts.find((post) => post.id === postId)
}

export default postsSlice.reducer
