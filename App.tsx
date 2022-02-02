/* eslint-disable react-hooks/exhaustive-deps */
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import {Pokemon} from './types';
import {getPokemonList} from './service';

const App = () => {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);

  const [count, setCount] = useState(0);

  useEffect(() => {
    void fetchPokemon();
  }, []);

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
    </View>
  );
};

export default App;
