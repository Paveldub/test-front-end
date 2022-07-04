import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "../../axios"

export const fetchLogin = createAsyncThunk(
  "auth/fetchAuth",
  async (params: any) => {
    const { data } = await axios.post("/auth/login", params)
    return data
  }
)

export const fetchAuthMe = createAsyncThunk("auth/fetchAuthMe", async () => {
  const { data } = await axios.get("/auth/me")
  return data
})

export const fetchRegister = createAsyncThunk(
  "auth/fetchRegister",
  async (params: any) => {
    const { data } = await axios.post("/auth/register", params)
    return data
  }
)

const initialState = {
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
  extraReducers: {
    // login
    [fetchLogin.pending as any]: (state) => {
      state.status = "loading"
      state.data = null
    },
    [fetchLogin.fulfilled as any]: (state, action) => {
      state.status = "loaded"
      state.data = action.payload
    },
    [fetchLogin.rejected as any]: (state) => {
      state.data = null
      state.status = "error"
    },
    // authMe
    [fetchAuthMe.pending as any]: (state) => {
      state.status = "loading"
      state.data = null
    },
    [fetchAuthMe.fulfilled as any]: (state, action) => {
      state.status = "loaded"
      state.data = action.payload
    },
    [fetchAuthMe.rejected as any]: (state) => {
      state.data = null
      state.status = "error"
    },
    // register
    [fetchRegister.pending as any]: (state) => {
      state.status = "loading"
      state.data = null
    },
    [fetchRegister.fulfilled as any]: (state, action) => {
      state.status = "loaded"
      state.data = action.payload
    },
    [fetchRegister.rejected as any]: (state) => {
      state.data = null
      state.status = "error"
    },
  },
})

export const isSelectAuth = (state: any) => Boolean(state.auth.data)

export const authReducer = authSlice.reducer

export const { logout } = authSlice.actions
