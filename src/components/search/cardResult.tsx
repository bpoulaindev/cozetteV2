import { Dimensions, ScrollView, View, SafeAreaView } from 'react-native';
import tw from '../../../lib/tailwind';
import { SpotCard } from '../spots/spotCard';
import React, { useEffect, useMemo, useState } from 'react';

const { style } = tw;
export const CardResult = ({spots}) => {
  console.log({spots},'ici');
  const childWidth = useMemo(() => 0.8 * Dimensions.get('window').width, []);
  const containerWidth = useMemo(
    () => childWidth * Object.keys(spots || {}).length + 64,
    [spots, childWidth]
  );
  return (
    <SafeAreaView style={style('w-full')}>
      <ScrollView style={style('w-100 mx-auto')}>
        {Object.values(spots || {}).map((spot, index) => (
          <SpotCard
            key={index}
            spotId={spot.objectID}
            classes={{
                container: 'ml-8',
              }}
          />
        ))}
      </ScrollView>
  </SafeAreaView>

  );
};
