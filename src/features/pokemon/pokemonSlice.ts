import {SerializedError, createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {Pokemon} from '../../../types';
import {getPokemonList} from '../../service';

export const fetchPokemonList = createAsyncThunk(
  'pokemon/getPokemonList',
  async () => {
    const response = await getPokemonList();
    return response.data.results;
  },
);

export interface PokemonState {
  pokemon: Pokemon[];
  loading: boolean;
  error: SerializedError | null;
}

const initialState: PokemonState = {
  pokemon: [],
  loading: false,
  error: null,
};

export const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchPokemonList.pending, state => {
      state.loading = true;
    });
    builder.addCase(fetchPokemonList.fulfilled, (state, action) => {
      state.pokemon = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchPokemonList.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
  },
});

// Action creators are generated for each case reducer function
export const {} = pokemonSlice.actions;

export default pokemonSlice.reducer;
