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
        <View style={style('flex w-full max-w-[90%] mx-5 bg-primary-100 mt-6 p-2 rounded-xl')}>
          <AppText style={style('text-2xl font-800 text-primary-300')}>Bonjour Fred !</AppText>
        </View>
        <WeekSelection />
        <AppText style={style('text-2xl font-600 max-w-[90%] mt-10 ml-4')}>
          Nos dernières nouveautés
        </AppText>
      </ScrollView>
    </SafeAreaView>
  );
};
