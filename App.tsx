/* eslint-disable react-hooks/exhaustive-deps */
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Pokemon, PokemonResponse} from './types';
import React, {useEffect, useState} from 'react';

import {AxiosResponse} from 'axios';
import create from 'zustand';
import {getPokemonList} from './service';
import shallow from 'zustand/shallow';

type CountState = {
  count: number;
  increment: () => void;
  reset: () => void;
};

type PokemonState = {
  pokemon: Pokemon[];
  fetchPokemonList: () => void;
  loading: boolean;
  error: boolean;
};

const countStore = create<CountState>(set => ({
  count: 0,
  increment: () => set(state => ({count: state.count + 1})),
  reset: () => set(() => ({count: 0})),
}));

const pokemonStore = create<PokemonState>(set => ({
  pokemon: [],
  loading: false,
  error: false,
  fetchPokemonList: async () => {
    set({loading: true});
    try {
      const response = await getPokemonList();
      set({pokemon: response.data.results});
      set({error: false});
    } catch (error) {
      set({error: true});
    } finally {
      set({loading: false});
    }
  },
}));

const App = () => {
  const {pokemon, loading, fetchPokemonList} = pokemonStore(
    state => ({
      pokemon: state.pokemon,
      loading: state.loading,
      error: state.error,
      fetchPokemonList: state.fetchPokemonList,
    }),
    shallow,
  );

  // const {count, increment, reset} = countStore();
  const {count, increment, reset} = countStore(
    state => ({
      count: state.count,
      increment: state.increment,
      reset: state.reset,
    }),
    shallow,
  );

  useEffect(() => {
    void fetchPokemonList();
  }, []);

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
        <TouchableOpacity onPress={increment}>
          <Text style={{fontSize: 30}}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => countStore.setState({count: 0})}>
          <Text style={{fontSize: 30}}>RESET</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={fetchPokemonList}
        style={{backgroundColor: 'lightblue', paddingVertical: 10}}>
        <Text style={{fontSize: 30, textAlign: 'center'}}>Fetch Again</Text>
      </TouchableOpacity>
    </View>
  );
};

export default App;
