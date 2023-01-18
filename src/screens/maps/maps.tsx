import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import tw from 'twrnc';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { decode } from '@googlemaps/polyline-codec';
import { AppText } from '../../components/appText';
import { SimpleButton } from '../../components/buttons';
//@ts-ignore
import { MAPS_API_KEY } from '@env';

const { style } = tw;
interface Duration {
  text: string;
  value: number;
}

interface Distance {
  text: string;
  value: number;
}

interface Leg {
  duration: Duration;
  distance: Distance;
}

interface Data {
  geocoded_waypoints: {
    geocoder_status: string;
    place_id: string;
    types: string[];
  }[];
  routes: {
    bounds: {
      northeast: {
        lat: number;
        lng: number;
      };
      southwest: {
        lat: number;
        lng: number;
      };
    };
    copyrights: string;
    legs: {
      distance: {
        text: string;
        value: number;
      };
      duration: {
        text: string;
        value: number;
      };
      end_address: string;
      end_location: {
        lat: number;
        lng: number;
      };
      start_address: string;
      start_location: {
        lat: number;
        lng: number;
      };
      steps: {
        // Array of step objects
      }[];
      traffic_speed_entry: any[];
      via_waypoint: any[];
    }[];
    overview_polyline: {
      points: string;
    };
    summary: string;
    warnings: any[];
    waypoint_order: number[];
  }[];
  status: string;
}

const CustomPolyline: React.FC<{
  origin: { latitude: number; longitude: number; title: string };
  destination: { latitude: number; longitude: number; title: string };
  mode: 'driving' | 'walking' | 'bicycling' | 'transit';
  duration: number[];
  setDuration: React.Dispatch<React.SetStateAction<number[]>>;
  index: number;
}> = ({ origin, destination, mode, duration, setDuration }) => {
  const [encodedPolyline, setEncodedPolyline] = useState<string>('');
  const [legDuration, setLegDuration] = useState<number>(0);
  useEffect(() => {
    const getPolyline = async () => {
      const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin.latitude},${origin.longitude}&destination=${destination.latitude},${destination.longitude}&mode=${mode}&key=${MAPS_API_KEY}`;
      const response = await fetch(url);
      const data = await response.json();
      const { routes } = data;
      const { overview_polyline, legs } = routes[0];
      const { points } = overview_polyline;
      setEncodedPolyline(points);
      setLegDuration(legs[0].duration.value);
    };
    getPolyline();
  }, [mode]);
  /* useEffect(() => {
    setDuration([...duration, legDuration]);
  }, [duration]); */
  return (
    <Polyline
      coordinates={decode(encodedPolyline).map(([latitude, longitude]) => ({
        latitude,
        longitude
      }))}
      strokeWidth={4}
      strokeColor='#3730A3'
    />
  );
};
export const Maps = () => {
  const [selectedMode, setSelectedMode] = useState<'driving' | 'walking' | 'bicycling' | 'transit'>(
    'transit'
  );
  const allModes = ['driving', 'walking', 'bicycling', 'transit'] as Array<
    'driving' | 'walking' | 'bicycling' | 'transit'
  >;
  const destinations = [
    { latitude: 50.6331477, longitude: 3.0179366, title: 'Euratech' },
    { latitude: 50.6373418, longitude: 3.0620811, title: 'La Cloche' },
    { latitude: 50.626922, longitude: 3.0692601, title: 'Le Mother' },
    { latitude: 50.626572, longitude: 3.0574846, title: 'Musée' }
  ];
  const handleSelectMode = (mode: 'driving' | 'walking' | 'bicycling' | 'transit') => {
    setSelectedMode(mode);
  };
  const maxLat = Math.max(...destinations.map(({ latitude }) => latitude));
  const minLat = Math.min(...destinations.map(({ latitude }) => latitude));
  const maxLng = Math.max(...destinations.map(({ longitude }) => longitude));
  const minLng = Math.min(...destinations.map(({ longitude }) => longitude));
  const initialRegion = {
    latitude: (minLat + maxLat) / 2,
    longitude: (minLng + maxLng) / 2,
    latitudeDelta: 1.01 * Math.max(maxLat - minLat, maxLng - minLng),
    longitudeDelta: 1.01 * Math.max(maxLat - minLat, maxLng - minLng)
  };
  const [receivedData, setReceivedData] = useState<Data | null>(null);
  useEffect(() => {
    const fetchRoute = async () => {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${destinations[0].latitude},${destinations[0].longitude}&destination=${destinations[3].latitude},${destinations[3].longitude}&waypoints=optimize:true|${destinations[1].latitude},${destinations[1].longitude}|${destinations[2].latitude},${destinations[2].longitude}&mode=${selectedMode}&key=${MAPS_API_KEY}`
      );
      const data: Data = await response.json();
      setReceivedData(data.status === 'OK' ? data : null);
    };
    fetchRoute();
  }, [selectedMode]);
  return (
    <View style={style('flex flex-col items-center w-full')}>
      <MapView style={style('h-[80%] mb-4 rounded-lg w-full')} initialRegion={initialRegion}>
        {receivedData?.routes[0]?.overview_polyline?.points && (
          <Polyline
            coordinates={decode(receivedData.routes[0].overview_polyline.points).map(
              ([latitude, longitude]) => ({
                latitude,
                longitude
              })
            )}
            strokeWidth={4}
            strokeColor='#3730A3'
          />
        )}
        {destinations.map((destination, index) => (
          <Marker coordinate={destination} title={destination.title} key={`marker_${index}`} />
        ))}
      </MapView>
      {receivedData?.routes[0]?.legs ? (
        <AppText style={style('text-center text-lg mb-4')}>
          Temps total:{' '}
          {Math.round(
            receivedData?.routes[0]?.legs?.reduce((acc, val) => acc + val.duration.value, 0) / 60
          )}{' '}
          minutes
        </AppText>
      ) : (
        <AppText style={style('text-center text-lg mb-4 text-red-500')}>PAS POSSIBLE WESH</AppText>
      )}
      <View style={style('flex-row justify-evenly w-full mb-4')}>
        {allModes.map((mode) => (
          <SimpleButton
            key={mode}
            content={mode}
            variant='contained'
            color={mode === selectedMode ? 'primary' : 'light'}
            onPress={() => handleSelectMode(mode)}
            buttonClasses={'rounded-lg py-2 mx-2'}
          />
        ))}
      </View>
    </View>
  );
};
