import React, { useEffect, useState } from 'react';
import { Pressable, View } from 'react-native';
import tw from '../../../../lib/tailwind';
import { AppText } from '../../../components/appText';
import { google } from 'google-maps';

type PlaceResult = google.maps.places.PlaceResult;
const { style } = tw;

interface PlaceInfos {
  test: any;
}
const DailyOpeningTime = ({ weekdayText }: { weekdayText: string }) => {
  const [day, timeRange] = weekdayText.split(': ');
  const [startTime, endTime] = timeRange.match(/\d{2}:\d{2}/g) ?? ['Fermé'];
  return (
    <View style={style('flex flex-row justify-start mt-4 ml-2')}>
      <AppText>{day.charAt(0).toUpperCase() + day.slice(1)}</AppText>
      <AppText style={style('ml-4 font-medium', startTime === 'Fermé' && 'text-red-500')}>
        {startTime === 'Fermé' ? 'Fermé' : `${startTime} - ${endTime}`}
      </AppText>
    </View>
  );
};
export const OpeningTime = ({ placeInfos }: { placeInfos: PlaceResult }) => {
  const [activeDay, setActiveDay] = useState<number>(new Date().getDay());
  const days = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
  return (
    <View
      style={style('flex flex-col bg-white w-full max-w-[90vw] mx-5 my-6 px-5 py-6 rounded-xl')}>
      <View style={style('flex flex-row items-center')}>
        <AppText style={style('text-secondary-300 text-xl font-medium')}>Horaires</AppText>
        <AppText style={style(' text-xl font-medium ml-1')}>d'ouverture</AppText>
      </View>
      <View style={style('flex flex-row justify-between mt-4')}>
        {days.map((day, index) => (
          <Pressable
            key={index}
            style={style(
              'flex flex-col items-center px-2 py-3 rounded-md',
              activeDay === index ? 'bg-primary-300' : 'bg-white'
            )}
            onPress={() => setActiveDay(index)}>
            <AppText style={style(activeDay === index ? 'text-white' : 'text-dark')}>{day}</AppText>
          </Pressable>
        ))}
      </View>
      {placeInfos?.opening_hours?.weekday_text[activeDay] && (
        <DailyOpeningTime weekdayText={placeInfos?.opening_hours?.weekday_text[activeDay]} />
      )}
    </View>
  );
};
