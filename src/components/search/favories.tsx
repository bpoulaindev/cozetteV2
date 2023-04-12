import { Dimensions, ScrollView, View,SafeAreaView } from 'react-native';
import tw from '../../../lib/tailwind';
import { AppText } from '../appText';
import { FavCard } from '../spots/favCard';
import { getAllSpots, getWeekSelection } from '../../actions/spots';
import { Spot } from '../../../types/spots';
import React, { useEffect, useMemo, useState } from 'react';
import { SpotCard } from '../spots/spotCard';

const { style } = tw;
export const Favories = () => {
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
    <SafeAreaView style={style(' w-full')}>
      <View style={style('w-full flex flex-col mt-10 ml-4')}>
        <View style={style('flex flex-row align-content-center  justify-between w-95')}>
        <AppText style={style('text-2xl font-600 ')}>
          Vos coups de coeur
        </AppText>
        <AppText style={style('text-sm font-600 inline-block align-middle')}>
          Voir tout
        </AppText>
        </View>
        <ScrollView
          style={style(`flex flex-row mt-6 w-full grow`)}
          horizontal
          disableIntervalMomentum
          showsHorizontalScrollIndicator={false}
          alwaysBounceVertical={false}
          alwaysBounceHorizontal={false}
          contentContainerStyle={{
            maxWidth: containerWidth
          }}>
          {Object.values(spots || {}).map((spotId, index) => (
            <FavCard
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
