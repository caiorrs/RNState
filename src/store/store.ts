import {configureStore} from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
// import {pokemonApi} from '../services/pokemon';
import pokemonReducer from '../features/pokemon/pokemonSlice';
import {setupListeners} from '@reduxjs/toolkit/dist/query';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    // [pokemonApi.reducerPath]: pokemonApi.reducer,
    pokemon: pokemonReducer,
  },
  // middleware: getDefaultMiddleware =>
  //   getDefaultMiddleware().concat(pokemonApi.middleware),
});

setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
