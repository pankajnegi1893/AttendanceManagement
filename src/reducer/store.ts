import { configureStore } from "@reduxjs/toolkit";
import personReducer from "./personSlice";
import { useDispatch } from 'react-redux'

const store = configureStore({
  reducer: {
    person: personReducer,
  },
});
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch // Export a hook that can be reused to resolve types
export type RootState = ReturnType<typeof store.getState>


export default store


