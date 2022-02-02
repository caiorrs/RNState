import {FlatList, Pressable, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';

import { Pokemon } from './types';

const App = () => {
  const [pokemon, setPokemon] = useState<Pokemon[]>([
    {name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/'},
    {name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/'},
    {name: 'venusaur', url: 'https://pokeapi.co/api/v2/pokemon/3/'},
    {name: 'charmander', url: 'https://pokeapi.co/api/v2/pokemon/4/'},
    {name: 'charmeleon', url: 'https://pokeapi.co/api/v2/pokemon/5/'},
    {name: 'charizard', url: 'https://pokeapi.co/api/v2/pokemon/6/'},
    {name: 'squirtle', url: 'https://pokeapi.co/api/v2/pokemon/7/'},
    {name: 'wartortle', url: 'https://pokeapi.co/api/v2/pokemon/8/'},
    {name: 'blastoise', url: 'https://pokeapi.co/api/v2/pokemon/9/'},
    {name: 'caterpie', url: 'https://pokeapi.co/api/v2/pokemon/10/'},
    {name: 'metapod', url: 'https://pokeapi.co/api/v2/pokemon/11/'},
    {name: 'butterfree', url: 'https://pokeapi.co/api/v2/pokemon/12/'},
    {name: 'weedle', url: 'https://pokeapi.co/api/v2/pokemon/13/'},
    {name: 'kakuna', url: 'https://pokeapi.co/api/v2/pokemon/14/'},
    {name: 'beedrill', url: 'https://pokeapi.co/api/v2/pokemon/15/'},
    {name: 'pidgey', url: 'https://pokeapi.co/api/v2/pokemon/16/'},
    {name: 'pidgeotto', url: 'https://pokeapi.co/api/v2/pokemon/17/'},
    {name: 'pidgeot', url: 'https://pokeapi.co/api/v2/pokemon/18/'},
    {name: 'rattata', url: 'https://pokeapi.co/api/v2/pokemon/19/'},
    {name: 'raticate', url: 'https://pokeapi.co/api/v2/pokemon/20/'},
  ]);

  const [count, setCount] = useState(0)


  const renderItem = ({ item }: { item: Pokemon }) => {
    return (
      <TouchableOpacity style={{paddingVertical: 20, borderBottomWidth: 1, alignItems: 'center'}} onPress={() => console.warn(item.name)}>
        <Text key={item.name}>{item.name}</Text>
      </TouchableOpacity>
    )
  }

  return (
    <View style={{flex: 1}}>
      <Text style={{textAlign: 'center', fontSize: 40}}>Pokemon List</Text>
      <FlatList
        data={pokemon}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 10 }}>
        <Text style={{fontSize: 30}}>{`Count: ${count}`}</Text>
        <TouchableOpacity onPress={() => setCount((prev) => prev + 1)}>
          <Text style={{fontSize: 30}} >+</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setCount(0)}>
          <Text style={{fontSize: 30}} >RESET</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default App;
