import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface NewsState {
  articles: any[];
  status: "idle" | "loading" | "failed";
}

const initialState: NewsState = {
  articles: [],
  status: "idle",
};

export const fetchNews = createAsyncThunk(
  "news/fetchNews",
  async (category: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=9730b649a15043bf92e79a0ac99fc6d6`
      );
      return response.data.articles;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to fetch news");
    }
  }
);

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.status = "idle";
        state.articles = action.payload;
      })
      .addCase(fetchNews.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default newsSlice.reducer;
