import { Dimensions, ScrollView, View, TextInput, Button,Pressable } from 'react-native';
import tw from '../../../lib/tailwind';
import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react';
import { SvgSearch } from '../../../assets/svg_components/icons/navbar/svg_search';
import { Palette } from '../../../lib/palette';

const { style } = tw;

export const SearchBar = ({ onEvent }) => {
    const [query, setQuery] = useState('');
    const [data, setData] = useState(null);
    const handleSearch = async () => {
      const response = await axios.get(`http://10.43.135.122:3333/search?q=${query}`);
      setData(response.data); 
      onEvent({data,query});
    };
    return (
        <View style={style('w-full flex flex-row mt-10 ml-4 max-w-[90vw] ')}>
            <TextInput
            placeholder="Rechercher un endroit..."
            onChangeText={(text) => setQuery(text)}
            value={query}
            style={style(`border-2 border-white rounded-[25px] px-4 pb-2 bg-white w-75`)}
            />

        <Pressable
        onPress={handleSearch}
        style={style('bg-primary-300 ml-2 hover:bg-red-700 text-white text-sm py-2 rounded-full')}>
        {({ pressed }) => (
            <View
              style={style(
                'px-3  rounded-full h-7 flex flex-col justify-center',
                'bg-transparent'
              )}>
              <SvgSearch
                fill={ Palette.white}
                classes={'max-w-6 max-h-6'}
              />
            </View>
        )}
      </Pressable>

            
        </View>
    );
}