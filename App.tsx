/* eslint-disable react-hooks/exhaustive-deps */
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {PokemonProvider, usePokemon} from './PokemonContext';
import React, {useEffect} from 'react';

import {Pokemon} from './types';

const RenderComponent = () => {
  const {count, fetchPokemon, increment, loading, pokemon, reset} =
    usePokemon();

  useEffect(() => {
    void fetchPokemon();
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
        <TouchableOpacity onPress={reset}>
          <Text style={{fontSize: 30}}>RESET</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const App = () => {
  return (
    <PokemonProvider>
      <RenderComponent />
    </PokemonProvider>
  );
};

export default App;
