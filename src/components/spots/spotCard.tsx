import tw from '../../../lib/tailwind';
import { Image, View } from 'react-native';
import { Spot } from '../../../types/spots';
import React, { useEffect, useState } from 'react';
import { AppText } from '../appText';
import { SvgPizza } from '../../../assets/svg_components/icons/food/svg_pizza';
import { SvgDining } from '../../../assets/svg_components/icons/food/svg_dining';
import { SvgRamen } from '../../../assets/svg_components/icons/food/svg_ramen';
import { SvgBurger } from '../../../assets/svg_components/icons/food/svg_burger';
import { SvgHeart } from '../../../assets/svg_components/icons/svg_heart';
import { Palette } from '../../../lib/palette';
import { getSpot } from '../../actions/spots';

const { style } = tw;
interface SpotCardProps {
  spotId: string;
  index?: number;
  classes?: {
    container?: string;
  };
}
export const SpotCard: React.FC<SpotCardProps> = ({ spotId, index, classes }) => {
  const [spot, setSpot] = useState<Spot | null>(null);
  async function fetchData() {
    const spot = (await getSpot(spotId)) as Spot;
    setSpot(spot);
  }
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <View
      style={style(
        'flex w-full flex-col max-w-[80vw] p-2 h-full bg-white rounded-lg items-center',
        classes?.container
      )}>
      <View style={style('w-full overflow-hidden relative')}>
        <Image
          source={{
            uri: spot?.images[0]
          }}
          style={style('w-full h-45 rounded-lg')}
        />
        <View
          style={style(
            'absolute top-[-2] right-[-2] w-10 h-10 bg-white p-2 rounded-full flex items-center justify-center'
          )}>
          <SvgHeart classes='max-w-6 max-h-4' fill={Palette.gray[100]} />
        </View>
        <View style={style('flex flex-row justify-between items-center mt-2')}>
          <View
            style={style(
              'px-3 py-1 rounded-full bg-tertiary-100 max-h-[30px] flex flex-row items-center justify-start'
            )}>
            <SvgDining classes='max-h-4 max-w-4 mr-2' />
            <AppText style={style('text-sm text-tertiary-300')}>{spot?.type}</AppText>
          </View>
          <View style={style('flex flex-row')}>
            <SvgPizza classes='max-h-5 max-w-5 mr-4' />
            <SvgBurger classes='max-h-5 max-w-5 mr-4' />
            <SvgRamen classes='max-h-5 max-w-5' />
          </View>
        </View>
        <AppText style={style('text-lg font-600 mt-2')}>{spot?.details.name}</AppText>
        <AppText style={style('text-sm text-gray-400 mt-1')}>{spot?.details.description}</AppText>
      </View>
    </View>
  );
};
