/* eslint-disable react-hooks/exhaustive-deps */
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Provider, useDispatch, useSelector} from 'react-redux';
import React, {useEffect} from 'react';
import {RootState, store} from './src/store/store';
import {increment, reset} from './src/features/counter/counterSlice';

import {Pokemon} from './types';
import {fetchPokemonList} from './src/features/pokemon/pokemonSlice';

// import {useGetPokemonListQuery} from './src/services/pokemon';

const RenderApp = () => {
  const count = useSelector((state: RootState) => state.counter.count);
  const {loading, pokemon} = useSelector((state: RootState) => state.pokemon);
  const dispatch = useDispatch();

  // const {data, error, isLoading} = useGetPokemonListQuery({skipToken: true});

  // useEffect(() => {
  //   dispatch(fetchPokemonList());
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
        <TouchableOpacity onPress={() => dispatch(increment())}>
          <Text style={{fontSize: 30}}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => dispatch(reset())}>
          <Text style={{fontSize: 30}}>RESET</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={() => dispatch(fetchPokemonList())}
        style={{backgroundColor: 'lightblue', paddingVertical: 20}}>
        <Text style={{fontSize: 20, textAlign: 'center'}}>Fetch again</Text>
      </TouchableOpacity>
    </View>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <RenderApp />
    </Provider>
  );
};

export default App;
