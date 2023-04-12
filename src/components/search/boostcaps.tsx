import { Dimensions, ScrollView, View, SafeAreaView } from 'react-native';
import tw from '../../../lib/tailwind';
import { AppText } from '../appText';
import { BoostCard } from '../spots/boostCard';
import { getAllSpots, getWeekSelection } from '../../actions/spots';
import { Spot } from '../../../types/spots';
import React, { useEffect, useMemo, useState } from 'react';

const { style } = tw;
export const BoostCaps = () => {
  const [spots, setSpots] = useState<{ [key: string]: string }>({});
  async function fetchData() {
    const spots = (await getWeekSelection()) as { [key: string]: string };
    setSpots(spots);
    // console.log('coucou', spots);
  }
  useEffect(() => {
    fetchData();
  }, []);
  const childWidth = useMemo(() => 0.8 * Dimensions.get('window').width, []);
  const containerWidth = useMemo(
    () => childWidth * Object.keys(spots || {}).length + 64,
    [spots, childWidth]
  );
  return (
    <SafeAreaView style={style('w-full bg-success-300')}>
    <View style={style('w-full flex flex-col mt-10 ml-4  mb-5')}>
       <AppText style={style('text-2xl font-600 ')}>
        Les Boost tes 
      </AppText>
      <View style={style('flex flex-row align-content-center  justify-between w-95')}>
        <AppText style={style('text-2xl font-600 ')}>
          cap`
        </AppText>
        <AppText style={style('text-sm font-600 inline-block align-middle')}>
          Voir tout
        </AppText>
      </View>
      <ScrollView
        style={style(``)}>
        {Object.values(spots || {}).map((spotId, index) => (
          <BoostCard
            key={index}
            spotId={spotId}
            classes={{
              container: 'mr-4',
            }}
          />
        ))}
      </ScrollView>
    </View>
  </SafeAreaView>

  );
};
