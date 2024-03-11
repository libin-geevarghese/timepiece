// src/redux/store.js

import {configureStore} from '@reduxjs/toolkit';
import todosSlice from './todoSlice';
import notesSlice from './notesSlice';

const store = configureStore({
  reducer: {
    todos: todosSlice,
    notes: notesSlice,
  },
});

export default store;
