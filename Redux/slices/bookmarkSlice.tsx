import { createSlice } from "@reduxjs/toolkit";

interface Image {
  largeImageURL: string | undefined;
  id: string;
  userImageURL: string;
  user: string;
  tags: string;
}

interface BookmarkState {
  bookmarks: Image[];
}

const initialState: BookmarkState = {
  bookmarks: [],
};

const bookmarkSlice = createSlice({
  name: "bookmark",
  initialState,
  reducers: {
    addBookmark: (state, action) => {
      state.bookmarks.push(action.payload);
    },
    removeBookmark: (state, action) => {
      state.bookmarks = state.bookmarks.filter(
        (image) => image.id !== action.payload
      );
    },
  },
});

export const { addBookmark, removeBookmark } = bookmarkSlice.actions;
export default bookmarkSlice.reducer;
