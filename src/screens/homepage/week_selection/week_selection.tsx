import { Dimensions, ScrollView, View } from 'react-native';
import tw from '../../../../lib/tailwind';
import { AppText } from '../../../components/appText';
import { SpotCard } from '../../../components/spots/spotCard';
import { getAllSpots, getWeekSelection } from '../../../actions/spots';
import { Spot } from '../../../../types/spots';
import React, { useEffect, useMemo, useState } from 'react';

const { style } = tw;
export const WeekSelection = () => {
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
    <View style={style('w-full flex flex-col mt-10 ml-4')}>
      <AppText style={style('text-2xl font-600 max-w-[90vw]')}>
        Notre sélection de la semaine
      </AppText>
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
          <SpotCard
            key={index}
            spotId={spotId}
            classes={{
              container: 'mr-4'
            }}
          />
        ))}
      </ScrollView>
    </View>
  );
};
