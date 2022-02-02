/* eslint-disable react-hooks/exhaustive-deps */
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Provider, atom, useAtom} from 'jotai';

import {Pokemon} from './types';
import React from 'react';
import {getPokemonList} from './service';

type PokemonState = {
  pokemon: Pokemon[];
  loading: boolean;
  error: boolean;
};

const countAtom = atom(0);
const pokemonAtom = atom<PokemonState>({
  pokemon: [],
  loading: false,
  error: false,
});
const fetchPokemonListAtom = atom(
  get => get(pokemonAtom),
  async (get, set) => {
    set(pokemonAtom, {...get(pokemonAtom), loading: true});
    try {
      const response = await getPokemonList();
      set(pokemonAtom, {
        ...get(pokemonAtom),
        pokemon: response.data.results,
        error: false,
      });
    } catch (error) {
      set(pokemonAtom, {...get(pokemonAtom), error: true});
    } finally {
      set(pokemonAtom, {...get(pokemonAtom), loading: false});
    }
  },
);

const RenderApp = () => {
  const [pokemonAtom, fetchPokemonList] = useAtom(fetchPokemonListAtom);
  const {pokemon, loading} = pokemonAtom;

  const [count, setCount] = useAtom(countAtom);

  // useEffect(() => {
  //   fetchPokemonList();
  // }, []);

  const renderItem = ({item}: {item: Pokemon}) => {
    return (
      <TouchableOpacity
        style={{
          paddingVertical: 20,
          borderBottomWidth: 1,
          alignItems: 'center',
        }}
        onPress={() => console.warn(item.name)}>
        <Text key={item.name}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <ActivityIndicator size={'large'} color="blue" />
      </View>
    );
  }

  return (
    <View style={{flex: 1}}>
      <Text style={{textAlign: 'center', fontSize: 40}}>Pokemon List</Text>
      <FlatList
        data={pokemon}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 20,
          paddingVertical: 10,
        }}>
        <Text style={{fontSize: 30}}>{`Count: ${count}`}</Text>
        <TouchableOpacity onPress={() => setCount(prev => prev + 1)}>
          <Text style={{fontSize: 30}}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setCount(0)}>
          <Text style={{fontSize: 30}}>RESET</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={{paddingVertical: 20, backgroundColor: 'lightblue'}}
        onPress={fetchPokemonList}>
        <Text style={{fontSize: 30, textAlign: 'center'}}>Fetch Again</Text>
      </TouchableOpacity>
    </View>
  );
};

const App = () => {
  return (
    <Provider>
      <RenderApp />
    </Provider>
  );
};

export default App;
