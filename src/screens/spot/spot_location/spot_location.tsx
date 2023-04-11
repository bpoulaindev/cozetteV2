import { Spot } from '../../../../types/spots';
import { Linking, Pressable, View } from 'react-native';
import tw from '../../../../lib/tailwind';
import { AppText } from '../../../components/appText';
import { SvgArrowRight } from '../../../../assets/svg_components/svg_arrow_right';
import { Palette } from '../../../../lib/palette';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { google } from 'google-maps';

type PlaceResult = google.maps.places.PlaceResult;
const { style } = tw;

//@ts-ignore
import { MAPS_API_KEY } from '@env';

interface PlaceDetails {
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
}

const MapScreen = ({
  placeResult,
  address,
  name
}: {
  placeResult: PlaceResult;
  address: string;
  name: string;
}) => {
  const { lat, lng } = useMemo(() => {
    return {
      lat: placeResult?.geometry?.location?.lat ?? '',
      lng: placeResult?.geometry?.location?.lng ?? ''
    };
  }, [placeResult?.geometry?.location]);
  const handlePress = () => {
    const url = `https://www.google.com/maps?q=${lat},${lng}(${name})`;
    Linking.openURL(url).then(() => console.log('it works', name));
  };

  return (
    <View style={style('flex flex-col items-center w-full')}>
      <Pressable
        style={style(
          'flex flex-row w-full max-w-[80vw] p-2 bg-primary-100 rounded-full justify-center items-center mt-2'
        )}
        onPress={() => handlePress()}>
        <AppText style={style('text-sm font-800')}>{address}</AppText>
        <SvgArrowRight classes='max-w-4 max-h-4 ml-2' fill={Palette.gray[300]} />
      </Pressable>
      <MapView
        style={style('h-50 mb-4 w-full mt-6')}
        initialRegion={{
          latitude: lat,
          longitude: lng,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01
        }}>
        <Marker coordinate={{ latitude: lat, longitude: lng }} />
      </MapView>
    </View>
  );
};
export const SpotLocation = ({ spot, placeResult }: { spot: Spot; placeResult: PlaceResult }) => {
  const handlePhone = () => {
    Linking.openURL(`tel:${spot.details.phone}`).then(() => console.log('phone triggered'));
  };
  return (
    <View style={style('flex flex-col w-full mt-6')}>
      <View style={style('flex flex-col w-full max-w-[90vw] px-5 mx-5 bg-cream rounded-xl')}>
        <AppText style={style('text-xl font-600')}>Informations sur l'accessibilité</AppText>
        <AppText style={style('text-base font-800 mt-2')}>Contact</AppText>
        <Pressable
          style={style(
            'flex flex-row w-full max-w-[80vw] p-2 bg-primary-100 rounded-full justify-center items-center mt-2'
          )}
          onPress={() => handlePhone()}>
          <AppText style={style('text-sm font-800')}>{spot.details.phone}</AppText>
          <SvgArrowRight classes='max-w-4 max-h-4 ml-2' fill={Palette.gray[300]} />
        </Pressable>
        <AppText style={style('text-base font-800 mt-2')}>Adresse</AppText>
      </View>
      <MapScreen
        placeResult={placeResult}
        address={spot?.details.address}
        name={spot.details.name}
      />
    </View>
  );
};
