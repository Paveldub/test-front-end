import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "../../axios"

interface InitialState {
  data: null | any
  status: string
}

export const fetchLogin = createAsyncThunk(
  "auth/fetchAuth",
  async (params: string) => {
    const { data } = await axios.post("/auth/login", params)
    return data
  }
)

export const fetchAuthMe = createAsyncThunk<InitialState>(
  "auth/fetchAuthMe",
  async () => {
    const { data } = await axios.get("/auth/me")
    return data
  }
)

export const fetchRegister = createAsyncThunk(
  "auth/fetchRegister",
  async (params: string) => {
    const { data } = await axios.post("/auth/register", params)
    return data
  }
)

const initialState: InitialState = {
  data: null,
  status: "loading",
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null
    },
  },
  extraReducers: (builder) => {
    // login
    builder.addCase(fetchLogin.pending, (state) => {
      state.status = "loading"
      state.data = null
    }),
      builder.addCase(fetchLogin.fulfilled, (state, action) => {
        state.status = "loaded"
        state.data = action.payload
      }),
      builder.addCase(fetchLogin.rejected, (state) => {
        state.data = null
        state.status = "error"
      }),
      // authMe
      builder.addCase(fetchAuthMe.pending, (state) => {
        state.status = "loading"
        state.data = null
      }),
      builder.addCase(fetchAuthMe.fulfilled, (state, action) => {
        state.status = "loaded"
        state.data = action.payload
      }),
      builder.addCase(fetchAuthMe.rejected, (state) => {
        state.data = null
        state.status = "error"
      }),
      // register
      builder.addCase(fetchRegister.pending, (state) => {
        state.status = "loading"
        state.data = null
      }),
      builder.addCase(fetchRegister.fulfilled, (state, action) => {
        state.status = "loaded"
        state.data = action.payload
      }),
      builder.addCase(fetchRegister.rejected, (state) => {
        state.data = null
        state.status = "error"
      })
  },
})

export const isSelectAuth = (state: any) => Boolean(state.auth.data)

export const authReducer = authSlice.reducer

export const { logout } = authSlice.actions
