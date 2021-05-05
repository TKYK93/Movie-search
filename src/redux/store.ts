import { combineReducers, createStore, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { MovieReducer, MovieState } from './movieRedux/movieReducer'

export type AppState = {
  movieState: MovieState
}

interface ExtendedWindow extends Window {
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose
}
declare let window: ExtendedWindow

const composeReduxDevToolsEnhancers =
  (typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose

export const rootReducer = combineReducers<AppState>({
  movieState: MovieReducer,
})

export type RootReducer = ReturnType<typeof rootReducer>

const store = createStore(rootReducer, composeReduxDevToolsEnhancers(applyMiddleware(thunk)))

export default store
