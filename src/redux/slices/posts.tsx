import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "../../axios"

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const { data } = await axios.get("/posts")
  return data
})

export const fetchTags = createAsyncThunk("posts/fetchTags", async () => {
  const { data } = await axios.get("/tags")
  return data
})

export const fetchRemovePosts = createAsyncThunk(
  "posts/fetchRemovePosts",
  async (id: any) => {
    await axios.delete(`/posts/${id}`)
  }
)

const initialState = {
  posts: {
    items: [],
    status: "loading",
  },
  tags: {
    items: [],
    status: "loading",
  },
}

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: {
    // posts
    [fetchPosts.pending as any]: (state) => {
      state.posts.items = []
      state.posts.status = "loading"
    },
    [fetchPosts.fulfilled as any]: (state, action) => {
      state.posts.items = action.payload
      state.posts.status = "loaded"
    },
    [fetchPosts.rejected as any]: (state) => {
      state.posts.items = []
      state.posts.status = "error"
    },
    // tags
    [fetchTags.pending as any]: (state) => {
      state.tags.items = []
      state.tags.status = "loading"
    },
    [fetchTags.fulfilled as any]: (state, action) => {
      state.tags.items = action.payload
      state.tags.status = "loaded"
    },
    [fetchTags.rejected as any]: (state) => {
      state.tags.items = []
      state.tags.status = "error"
    },
    // remove post
    [fetchRemovePosts.pending as any]: (state, action) => {
      state.posts.items = state.posts.items.filter(
        (obj: any) => obj._id !== action.meta.arg
      )
    },
  },
})

export const postsReducer = postSlice.reducer
