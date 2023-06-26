import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { content } from "../data";
import axiosInstance from "../helpers/axiosInstance";

const initialState = {
  allContent: [],
  currentContent: null,
  filteredContent: [],
  loading: false,
  contentLoading: true,
};

export const likeContent = createAsyncThunk(
  "content/likeContent",
  async (contentId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/content/${contentId}/likes`);

      const data = response.data.data.contents;
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchContentBySearch = createAsyncThunk(
  "content/fetchContentBySearch",
  async (searchText, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/content?search=${searchText}`);

      const data = response.data.data.contents;
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchContentByCategory = createAsyncThunk(
  "content/fetchContentByCategory",
  async (category, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/content?category=${category}`);
      const data = response.data.data.contents;

      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addNewContent = createAsyncThunk(
  "content/addNewContent",
  async (newContent, { rejectWithValue }) => {
    console.log("reached", newContent);
    try {
      const response = await axiosInstance.post(`/content`, newContent);
      const data = response.data.contentData;
      // fetchContentById()
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateContentById = createAsyncThunk(
  "content/updateContentById",
  async ({ id, sentFormData }, { rejectWithValue }) => {
    let progress = 0;
    console.log("called updar");
    try {
      const response = await axiosInstance.put(`/content/${id}`, sentFormData, {
        onUploadProgress: (progressEvent) => {
          progress = Math.round(
            (progressEvent.loaded / progressEvent.total) * 100
          );
        },
      });
      const data = response.data.contentData;

      return { ...data, progress };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteContentById = createAsyncThunk(
  "content/deleteContentById",
  async (contentId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/content/${contentId}`);
      const data = response.data.contentData;

      return { data, contentId };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// export const updateContentById = async (id, data) => {
//   console.log(data)
//   try{
//     const response = await axiosInstance.put(`/content/${id}`, data, {
//       onUploadProgress: (progressEvent) => {
//         const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
//         onProgress(progress);
//       },
//     });
//     console.log(response)
//     return response
//   } catch (err) {
//     return err.response
//   }
// }

export const fetchContentById = createAsyncThunk(
  "content/fetchContentById",
  async (contentId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/content/${contentId}`);
      const data = response.data.data;

      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchContent = createAsyncThunk(
  "content/fetchContent",
  async (rejectWithValue) => {
    try {
      const response = await axiosInstance.get("/content/");

      const data = response.data.data.contents;
      console.log(data);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const contentSlice = createSlice({
  name: "content",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //fetch all content
      .addCase(fetchContent.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchContent.fulfilled, (state, action) => {
        state.allContent = [...action.payload];
        state.loading = false;
      })
      .addCase(fetchContent.rejected, (state) => {
        state.allContent = [];
        state.loading = false;
      })

      //fetch content by id
      .addCase(fetchContentById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchContentById.fulfilled, (state, action) => {
        state.currentContent = action.payload;
        state.loading = false;
      })
      .addCase(fetchContentById.rejected, (state) => {
        state.currentContent = null;
        state.loading = false;
      })

      // add new content
      .addCase(addNewContent.pending, (state) => {
        state.contentLoading = true;
      })
      .addCase(addNewContent.fulfilled, (state, action) => {
        state.allContent = [...state.allContent, action.payload];
        state.contentLoading = false;
      })
      .addCase(addNewContent.rejected, (state) => {
        state.currentContent = null;
        state.contentLoading = false;
      })

      // delete content by id
      .addCase(deleteContentById.pending, (state) => {
        state.contentLoading = true;
      })
      .addCase(deleteContentById.fulfilled, (state, action) => {
        const deletedContentId = action.payload.contentId;
        const filteredContent = state.allContent.filter(
          (item) => item._id !== deletedContentId
        );
        state.allContent = filteredContent;
        state.contentLoading = false;
      })
      .addCase(deleteContentById.rejected, (state) => {
        state.allContent = [];
        state.contentLoading = false;
      })

      // update content by id
      .addCase(updateContentById.pending, (state) => {
        state.contentLoading = true;
      })
      .addCase(updateContentById.fulfilled, (state, action) => {
        const updatedContent = action.payload;
        const newAllContent = state.allContent.map((content) =>
          content._id === updatedContent._id ? updatedContent : content
        );
        state.allContent = newAllContent;
        state.contentLoading = false;
      })
      .addCase(updateContentById.rejected, (state) => {
        state.allContent = [];
        state.loading = false;
      })

      //fetch content by category
      .addCase(fetchContentByCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchContentByCategory.fulfilled, (state, action) => {
        state.filteredContent = action.payload;
        state.loading = false;
      })
      .addCase(fetchContentByCategory.rejected, (state) => {
        state.filteredContent = [];
        state.loading = false;
      })

      //fetch content by search
      .addCase(fetchContentBySearch.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchContentBySearch.fulfilled, (state, action) => {
        state.filteredContent = action.payload;
        state.loading = false;
      })
      .addCase(fetchContentBySearch.rejected, (state) => {
        state.filteredContent = [];
        state.loading = false;
      });
  },
});

//export const {} = contentSlice.actions;
export default contentSlice.reducer;
