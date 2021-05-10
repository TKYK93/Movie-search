import { combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { MovieReducer, MovieState } from './movieRedux/movieReducer'
import { configureStore } from '@reduxjs/toolkit'

export type AppState = {
  movieState: MovieState
}

export const rootReducer = combineReducers<AppState>({
  movieState: MovieReducer,
})

export type RootReducer = ReturnType<typeof rootReducer>

const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk],
})

export type AppDispatch = typeof store.dispatch

export default store
