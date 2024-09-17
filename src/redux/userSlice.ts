import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define the types for user data
interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

interface UsersState {
  users: User[];
  filteredUsers: User[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: UsersState = {
  users: [],
  filteredUsers: [],
  status: "idle",
  error: null,
};

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const responses = await Promise.all([
    axios.get("https://reqres.in/api/users?page=1"),
    axios.get("https://reqres.in/api/users?page=2"),
  ]);

  // Combine results from both pages
  const combinedUsers = responses.flatMap((response) => response.data.data);

  return combinedUsers;
});

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    filterUsers: (state) => {
      state.filteredUsers = state.users.filter(
        (user) =>
          user.first_name.startsWith("G") || user.last_name.startsWith("W")
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch users";
      });
  },
});

export const { filterUsers } = usersSlice.actions;
export default usersSlice.reducer;
