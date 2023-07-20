import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as authService from "../services/authService";

const initialState = {
  currentUser: null,
  isLoading: false,
  errorMessage: "",
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.isLoading = false;
      state.errorMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.errorMessage = "";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.currentUser = action.payload;
        state.isLoading = false;
        console.log("state.currentUser ", state.currentUser);
      })
      .addCase(login.rejected, (state, action) => {
        state.errorMessage = action.payload;
        state.isLoading = false;
      })
      .addCase(logout.fulfilled, (state) => {
        state.currentUser = null;
        state.isLoading = false;
        state.errorMessage = "";
        console.log("state.currentUser ", state.currentUser);
      });
  },
});

export const { loginSuccess } = authSlice.actions;

export const login = createAsyncThunk(
  "api/login",
  async (loginData, { rejectWithValue }) => {
    const res = await authService.signin(loginData.loginInfo);
    console.log("res", res);
    if (res.statusCode !== 400) {
      const authInformation = {
        user: res.user,
        access_token: res.access_token,
      };
      localStorage.setItem('member', JSON.stringify(res));
      loginData.navigate("/dashboard");
      return authInformation;
    }
    return rejectWithValue(res.data.message);
  }
);

export const logout = createAsyncThunk(
  "api/logout",
  async (navigate) => {
    await authService.logout();
    localStorage.removeItem('member');
    localStorage.removeItem('persist:root');
    navigate("/login");
    return "Logout success";
  }
);

export default authSlice;