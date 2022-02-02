import axios, {AxiosResponse} from 'axios';

import {PokemonResponse} from '../types';

const API = axios.create({
  baseURL: 'https://pokeapi.co/api/v2',
  timeout: 10 * 1000,
});

export const getPokemonList = (): Promise<AxiosResponse<PokemonResponse>> => {
  return API.get('/pokemon', {});
};
