import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "../../axios"

interface InitialState {
  posts: {
    items: []
    status: string | null
  }
  tags: {
    items: []
    status: string | null
  }
}

export const fetchPosts = createAsyncThunk<InitialState[]>(
  "posts/fetchPosts",
  async () => {
    const { data } = await axios.get("/posts")
    return data
  }
)

export const fetchTags = createAsyncThunk<InitialState[]>(
  "posts/fetchTags",
  async () => {
    const { data } = await axios.get("/tags")
    return data
  }
)

export const fetchRemovePosts = createAsyncThunk(
  "posts/fetchRemovePosts",
  async (id: number) => {
    await axios.delete(`/posts/${id}`)
  }
)

const initialState: InitialState = {
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
  extraReducers: (builder) => {
    // posts
    builder.addCase(fetchPosts.pending, (state) => {
      state.posts.items = []
      state.posts.status = "loading"
    }),
      builder.addCase(fetchPosts.fulfilled, (state, action) => {
        ;(state.posts.items as any) = action.payload
        state.posts.status = "loaded"
      }),
      builder.addCase(fetchPosts.rejected, (state) => {
        state.posts.items = []
        state.posts.status = "error"
      }),
      // tags
      builder.addCase(fetchTags.pending, (state) => {
        state.tags.items = []
        state.tags.status = "loading"
      }),
      builder.addCase(fetchTags.fulfilled, (state, action) => {
        ;(state.tags.items as any) = action.payload
        state.tags.status = "loaded"
      }),
      builder.addCase(fetchTags.rejected, (state) => {
        state.tags.items = []
        state.tags.status = "error"
      }),
      // remove post
      builder.addCase(fetchRemovePosts.pending, (state, action) => {
        ;(state.posts.items as any) = state.posts.items.filter(
          (obj: any) => obj._id !== action.meta.arg
        )
      })
  },
})

export const postsReducer = postSlice.reducer
