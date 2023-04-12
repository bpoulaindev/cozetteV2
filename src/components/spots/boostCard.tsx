import tw from '../../../lib/tailwind';
import { Image, TouchableOpacity, View } from 'react-native';
import { Spot } from '../../../types/spots';
import React, { useEffect, useMemo, useState } from 'react';
import { AppText } from '../appText';
import { SvgHeart } from '../../../assets/svg_components/icons/svg_heart';
import { Palette } from '../../../lib/palette';
import { getSpot } from '../../actions/spots';
import { t } from 'i18next';
import { SpotIcon } from './spot_icon';
import { getPlaceInformations } from '../../actions/places';
import { useNavigate } from 'react-router-dom';

const { style } = tw;
interface PlaceInfos {
  test: any;
}
interface SpotCardProps {
  spotId: string;
  index?: number;
  classes?: {
    container?: string;
  };
}
export const BoostCard: React.FC<SpotCardProps> = ({ spotId, index, classes }) => {
  const [spot, setSpot] = useState<Spot | null>(null);
  const [placeInfos, setPlaceInfos] = useState<PlaceInfos | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  async function fetchData() {
    const fetchedSpot = (await getSpot(spotId)) as Spot;
    setSpot(fetchedSpot);
    const fetchedInfos = (await getPlaceInformations(spot?.placeId || '')) as PlaceInfos;
    setPlaceInfos(fetchedInfos);
  }
  useEffect(() => {
    fetchData().then(() => setLoading(false));
  }, []);

  const { typeColor, mainIcon, iconType } = useMemo(() => {
    switch (spot?.type) {
      case 'bar':
        return {
          typeColor: 'secondary',
          mainIcon: 'cocktail',
          iconType: 'food'
        };
      case 'restaurant':
        return {
          typeColor: 'tertiary',
          mainIcon: 'dining',
          iconType: 'food'
        };
      default:
        return {
          typeColor: 'primary',
          mainIcon: 'activities',
          iconType: 'activities'
        };
    }
  }, [spot?.type]) as {
    typeColor: 'tertiary' | 'secondary' | 'primary';
    mainIcon: 'activities' | 'dining' | 'cocktail';
    iconType: 'food' | 'activities';
  };
  if (loading) {
    return (
      <View
        style={style(
          'flex w-full flex-col max-w-[80vw] p-2 h-100 bg-gray-100 rounded-lg items-center justify-center',
          classes?.container
        )}></View>
    );
  }
  return (
    <TouchableOpacity onPress={() => navigate(`/spot/${spotId}`)} style={style('max-w-[95%]')}>
      <View
        style={style(
          'flex w-full flex-col max-w-[100%] mx-auto p-2 bg-white rounded-lg items-center my-2',
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
            <SvgHeart classes='max-w-6 max-h-4' fill={Palette.primary[300]} />
          </View>
          <View style={style('flex flex-row justify-between items-center mt-2')}>
            <View
              style={style(
                'px-3 py-1 rounded-full max-h-[30px] flex flex-row items-center justify-start',
                `bg-${typeColor}-100`
              )}>
              <SpotIcon type={iconType} color={typeColor} icon={mainIcon} classes='mr-2 max-h-4' />
              <AppText style={style('text-sm', `text-${typeColor}-300`)}>
                {t(`Main.${spot?.type}`) ?? ''}
              </AppText>
            </View>
            <View style={style('flex flex-row')}>
              {spot?.food?.map((food, index) => (
                <SpotIcon
                  key={index}
                  type='food'
                  color={typeColor}
                  icon={food}
                  classes='ml-3 max-h-4'
                />
              ))}
            </View>
          </View>
          <AppText style={style('text-lg font-600 mt-2')}>{spot?.details.name}</AppText>
        </View>
      </View>
    </TouchableOpacity>
  );
};
