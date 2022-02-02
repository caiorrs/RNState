import React, {createContext, useContext, useState} from 'react';

import {Pokemon} from './types';
import {getPokemonList} from './service';

interface PokemonContext {
  pokemon: Pokemon[];
  loading: boolean;
  count: number;
  increment: () => void;
  reset: () => void
  fetchPokemon: () => Promise<void>;
}

const PokemonContext = createContext({} as PokemonContext);

export const PokemonProvider: React.FC = ({children}) => {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);

  const [count, setCount] = useState(0);

  const increment = () => setCount(prev => prev + 1);

  const reset = () => setCount(0);

  const fetchPokemon = async () => {
    setLoading(true);
    try {
      const response = await getPokemonList();
      setPokemon(response.data.results);
    } catch (error) {
      console.warn({error});
      console.log('Error getting Pokemon list');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PokemonContext.Provider
      value={{
        pokemon,
        loading,
        count,
        increment,
        reset,
        fetchPokemon,
      }}>
      {children}
    </PokemonContext.Provider>
  );
};

export const usePokemon = () => useContext(PokemonContext);
