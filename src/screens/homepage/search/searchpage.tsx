import { Dimensions, SafeAreaView, ScrollView, View } from 'react-native';
import tw from '../../../../lib/tailwind';
import { AppText } from '../../../components/appText';
import { SearchBar } from '../../../components/search/searchbar';
import { Results } from '../../../components/search/results';
import { Favories } from '../../../components/search/favories';
import { BoostCaps } from '../../../components/search/boostcaps';
import React, { useEffect, useMemo, useState } from 'react';



const { style } = tw;

export const SearchPage = () => {
      const [data, setData] = useState(null);
    const handleChildEvent = (event:any) => {
        console.log(event,'ici');
        setData(event);
      };
    if(data !== null){ 
    return (
      <SafeAreaView style={style('flex flex-col bg-cream items-center h-full w-full')}>
        <ScrollView
          style={style(' bg-cream w-full')}
          horizontal={false}
          showsHorizontalScrollIndicator={false}
          alwaysBounceVertical={false}
          alwaysBounceHorizontal={false}>
          <AppText style={style('text-2xl font-600 max-w-[90%] mt-10 ml-4')}>
            Rechercher un endroit
          </AppText>
          <SearchBar onEvent={handleChildEvent} />
          <Results shouldData={data.data} search={data.query}/>   
        </ScrollView>
      </SafeAreaView>
    );
    } else {
        return (
            <SafeAreaView style={style('flex flex-col bg-cream items-center h-full w-full')}>
            <ScrollView
              style={style(' bg-cream w-full')}
              horizontal={false}
              showsHorizontalScrollIndicator={false}
              alwaysBounceVertical={false}
              alwaysBounceHorizontal={false}>
              <AppText style={style('text-2xl font-600 max-w-[90%] mt-10 ml-4')}>
                Rechercher un endroit
              </AppText>
              <SearchBar onEvent={handleChildEvent} />
              <Favories />
              <BoostCaps />
              
            </ScrollView>
          </SafeAreaView>
        );
    }
}