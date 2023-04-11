import { SafeAreaView, ScrollView, View } from 'react-native';
import { Button, SimpleButton } from '../../components/buttons';
import { AppText } from '../../components/appText';
import React, { useState } from 'react';
import { WeekSelection } from './week_selection/week_selection';
import tw from '../../../lib/tailwind';
const { style } = tw;
export const Homepage = () => {
  return (
    <SafeAreaView style={style('flex flex-col bg-cream items-center h-full w-full')}>
      <ScrollView
        style={style(' bg-cream w-full')}
        horizontal={false}
        showsHorizontalScrollIndicator={false}
        alwaysBounceVertical={false}
        alwaysBounceHorizontal={false}>
        <WeekSelection />
        <AppText style={style('text-2xl font-600 max-w-[90%] mt-10 ml-4')}>
          Nos dernières nouveautés
        </AppText>
      </ScrollView>
    </SafeAreaView>
  );
};
