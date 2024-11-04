import { createSlice } from "@reduxjs/toolkit";

interface GalleryState {
  images: any | [];
  error: string | null;
}

const initialState: GalleryState = {
  images: [],
  error: null,
};

const gallerySlice = createSlice({
  name: "gallery",
  initialState,
  reducers: {
    fetchSearchImages: (state, action) => {
      state.images = action.payload;
    },
  },
});

export const { fetchSearchImages } = gallerySlice.actions;

export default gallerySlice.reducer;
