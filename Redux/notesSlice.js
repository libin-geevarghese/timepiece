// import createSlice from '@reduxjs/toolkit';
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

// Define an async thunk for fetching data
export const fetchNotes = createAsyncThunk('example/fetchData', async () => {
  try {
    const response = await fetch('https://mytestdomain.online/api/notes');
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
});

// Create a slice with initial state, reducers, and the async thunk
const notesSlice = createSlice({
  name: 'example',
  initialState: {
    notesData: [], // Initial state as an empty array
    notesLoading: false,
    notesLoadingError: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchNotes.pending, state => {
        state.notesLoading = true;
        state.notesLoadingError = null;
      })
      .addCase(fetchNotes.fulfilled, (state, action) => {
        state.notesLoading = false;
        state.notesData = action.payload;
      })
      .addCase(fetchNotes.rejected, (state, action) => {
        state.notesLoading = false;
        state.notesLoadingError = action.error.message;
      });
  },
});

// Export the async thunk for external use
// export {fetchNotes};

// Export the reducer
export default notesSlice.reducer;
