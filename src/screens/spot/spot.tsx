import React, { useEffect, useState } from 'react';
import { Image, SafeAreaView, View } from 'react-native';
import { AppText } from '../../components/appText';
import tw from '../../../lib/tailwind';
import { useLocation } from 'react-router-dom';
import { getSpot, getWeekSelection } from '../../actions/spots';
import { Spot } from '../../../types/spots';
import { SvgHeart } from '../../../assets/svg_components/icons/svg_heart';
import { Palette } from '../../../lib/palette';
import { SvgArrowLeft } from '../../../assets/svg_components/svg_arrow_left';
import { HeartIcon, ShareIcon } from 'react-native-heroicons/solid';

const { style } = tw;
export const SpotPage = () => {
  const location = useLocation();
  const path = location.pathname;
  const spotId = path.substring(path.lastIndexOf('/') + 1);
  const [spot, setSpot] = useState<Spot>();
  async function fetchData() {
    const spot = (await getSpot(spotId)) as Spot;
    setSpot(spot);
  }
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <SafeAreaView style={style('flex flex-col w-full bg-cream items-center justify-center')}>
      <View style={style('w-full overflow-hidden relative bg-white mt-6 max-w-[100vw] px-5 py-6')}>
        <Image
          source={{
            uri: spot?.images[0]
          }}
          style={style('w-full h-60 border-gray-300 border-2 rounded-lg')}
        />
        <View
          style={style(
            'absolute top-5 right-4 w-10 h-10 bg-white p-2 rounded-full flex items-center justify-center'
          )}>
          <HeartIcon style={style('max-h-5 max-w-5')} fill={Palette.gray[100]} />
        </View>
        <View
          style={style(
            'absolute top-5 left-4 w-10 h-10 bg-white p-2 rounded-full flex items-center justify-center'
          )}>
          <SvgArrowLeft classes='max-w-6 max-h-4' fill={Palette.gray[100]} />
        </View>
        <View
          style={style(
            'absolute top-5 right-16 w-10 h-10 bg-white p-2 rounded-full flex items-center justify-center'
          )}>
          <ShareIcon style={style('max-w-5 max-h-5')} fill={Palette.primary[200]} />
        </View>
      </View>
      <View
        style={style('flex flex-col justify-center w-full max-w-[90vw] px-5 py-6 bg-white mt-6')}>
        <View style={style('flex flex-row justify-between items-center')}>
          <AppText style={style('text-2xl font-bold')}>{spot?.details.name}</AppText>
        </View>
      </View>
    </SafeAreaView>
  );
};
