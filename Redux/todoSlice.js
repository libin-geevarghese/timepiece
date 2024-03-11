import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {todoURL} from '../API/serverCodes';

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  try {
    const response = await fetch(todoURL);
    const todosData = await response.json();
    return todosData;
  } catch (error) {
    throw error.message;
  }
});

const todosSlice = createSlice({
  name: 'todos',
  initialState: {
    data: [],
    importantData: [],
    todayData: [],
    tommorowData: [],
    thisWeekData: [],
    thisMonthData: [],
    missedData: [],
    archievedData: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchTodos.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        //set loading = false
        state.loading = false;

        //set the data
        state.data = action.payload
          ? action.payload.filter(event => event.isArchieved === false)
          : [];

        const today = new Date();

        //filtering todo events
        state.todayData = action.payload
          ? action.payload.filter(event => {
              const eventDate = new Date(event.time);
              return (
                eventDate.getDate() === today.getDate() &&
                eventDate.getMonth() === today.getMonth() &&
                eventDate.getFullYear() === today.getFullYear()
              );
            })
          : [];

        //filtering tommorow

        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);
        state.tommorowData = action.payload
          ? action.payload.filter(event => {
              const eventDate = new Date(event.time);
              return (
                eventDate.getDate() === tomorrow.getDate() &&
                eventDate.getMonth() === tomorrow.getMonth() &&
                eventDate.getFullYear() === tomorrow.getFullYear()
              );
            })
          : [];

        // Filter events for the current week
        const currentDate = new Date();
        const startOfWeek = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          currentDate.getDate() - currentDate.getDay(),
        );
        const endOfWeek = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          currentDate.getDate() - currentDate.getDay() + 6,
        );

        state.thisWeekData = action.payload
          ? action.payload.filter(event => {
              const eventDate = new Date(event.time);
              return eventDate >= startOfWeek && eventDate <= endOfWeek;
            })
          : [];

        //filtering this month data

        state.thisMonthData = action.payload
          ? action.payload.filter(event => {
              const eventDate = new Date(event.time);
              return (
                eventDate.getMonth() === today.getMonth() &&
                eventDate.getFullYear() === today.getFullYear()
              );
            })
          : [];

        //filering important
        state.importantData = action.payload
          ? action.payload.filter(
              event => event.isImportant && new Date(event.time) >= new Date(),
            )
          : [];

        //filtering missed events

        state.missedData = action.payload
          ? action.payload.filter(event => new Date(event.time) < new Date())
          : [];

        //filtering archieved
        state.archievedData = action.payload
          ? action.payload.filter(event => event.isArchieved)
          : [];
      })

      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default todosSlice.reducer;
