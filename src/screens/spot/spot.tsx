import React, { useEffect, useMemo, useState } from 'react';
import { Image, Pressable, SafeAreaView, ScrollView, Share, View } from 'react-native';
import { AppText } from '../../components/appText';
import tw from '../../../lib/tailwind';
import { useLocation, useNavigate } from 'react-router-dom';
import { getSpot, getWeekSelection } from '../../actions/spots';
import { Spot } from '../../../types/spots';
import { Palette } from '../../../lib/palette';
import { SvgArrowLeft } from '../../../assets/svg_components/svg_arrow_left';
import { HeartIcon, ShareIcon, StarIcon } from 'react-native-heroicons/solid';
import { SvgArrowRight } from '../../../assets/svg_components/svg_arrow_right';
import { SpotIcon } from '../../components/spots/spot_icon';
import { t } from 'i18next';
import { SvgFriends } from '../../../assets/svg_components/icons/activity/svg_friends';
import { SvgFamily } from '../../../assets/svg_components/icons/activity/svg_family';
import { SvgSofa } from '../../../assets/svg_components/icons/activity/svg_sofa';
import { OpeningTime } from './opening_time/opening_time';
import { SpotLocation } from './spot_location/spot_location';
import { getPlaceInformations } from '../../actions/places';
import { google } from 'google-maps';
import { SpotReviews } from './spot_reviews/spot_reviews';

type PlaceResult = google.maps.places.PlaceResult;
const { style } = tw;

const SpotDescription = ({ description }: { description: string }) => {
  return (
    <View style={style('flex flex-col w-full max-w-[90vw] px-5 rounded-xl mt-1')}>
      <AppText style={style('text-xl font-600')}>Description</AppText>
      <AppText style={style('text-sm mt-2 font-300')}>{description}</AppText>
    </View>
  );
};
export const SpotPage = () => {
  const location = useLocation();
  const path = location.pathname;
  const spotId = path.substring(path.lastIndexOf('/') + 1);
  const [spot, setSpot] = useState<Spot>();
  const [loading, setLoading] = useState<boolean>(true);
  const [placeInfos, setPlaceInfos] = useState<PlaceResult | null>(null);
  async function fetchData() {
    const spot = (await getSpot(spotId)) as Spot;
    setSpot(spot);
  }
  async function fetchPlaceInformations() {
    const fetchedInfos = (await getPlaceInformations(spot?.placeId ?? '')) as any;
    setPlaceInfos(fetchedInfos.result);
  }
  useEffect(() => {
    fetchData().then(() => setLoading(false));
  }, []);
  useEffect(() => {
    fetchPlaceInformations().then(() => setLoading(false));
  }, [spot?.placeId]);
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
  const navigate = useNavigate();
  const sharing = async () => {
    try {
      const result = await Share.share({
        message: "Regarde cet endroit que j'ai trouvé sur Cozette : " + spot?.details?.name
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      console.log(error);
    }
  };
  if (!spot) {
    return null;
  }
  return (
    <SafeAreaView style={style('flex flex-col w-full bg-cream items-center justify-center')}>
      <ScrollView style={style('w-full flex flex-col')}>
        <View
          style={style('w-full overflow-hidden relative bg-white mt-6 max-w-[100vw] px-5 py-6')}>
          <Image
            source={{
              uri: spot?.images[0]
            }}
            style={style('w-full h-60 rounded-lg')}
          />
          <Pressable
            style={style(
              'absolute top-5 right-4 w-10 h-10 bg-white p-2 rounded-full flex items-center justify-center'
            )}>
            <HeartIcon style={style('max-h-5 max-w-5')} fill={Palette.gray[100]} />
          </Pressable>
          <Pressable
            style={style(
              'absolute top-5 left-4 w-10 h-10 bg-white p-2 rounded-full flex items-center justify-center'
            )}
            onPress={() => navigate(-1)}>
            <SvgArrowLeft classes='max-w-6 max-h-4' fill={Palette.gray[100]} />
          </Pressable>
          <Pressable
            style={style(
              'absolute top-5 right-16 w-10 h-10 bg-white p-2 rounded-full flex items-center justify-center'
            )}
            onPress={() => sharing()}>
            <ShareIcon style={style('max-w-5 max-h-5')} fill={Palette.primary[200]} />
          </Pressable>
        </View>
        <View
          style={style(
            'flex flex-col justify-center w-full max-w-[90vw] mx-5 px-5 py-6 bg-white rounded-xl mt-6'
          )}>
          <View style={style('flex flex-row justify-between items-center')}>
            <AppText style={style('text-3xl font-bold')}>{spot?.details.name}</AppText>
            <View style={style('flex flex-row items-center')}>
              <AppText style={style('text-xl font-medium')}>{spot?.ranking} / 5</AppText>
              <StarIcon style={style('max-w-5 max-h-5 ml-2')} fill={Palette.yellow} />
            </View>
          </View>
          <View
            style={style(
              'flex flex-row p-2 bg-primary-100 rounded-full justify-center items-center mt-2'
            )}>
            <AppText style={style('text-sm font-800')}>{spot?.details.address}</AppText>
            <SvgArrowRight classes='max-w-4 max-h-4 ml-2' fill={Palette.gray[300]} />
          </View>
          <View style={style('flex flex-row flex-wrap w-full mt-4')}>
            <View
              style={style(
                `flex flex-row px-2 py-1 rounded-full items-center bg-${typeColor}-300 self-start mr-2 mb-2`
              )}>
              <SpotIcon type={iconType} color='typedWhite' icon={mainIcon} classes='mr-1 max-h-4' />
              <AppText style={style('text-xs font-medium text-white')}>
                {t(`Main.${spot?.type}`)}
              </AppText>
            </View>
            <View
              style={style(
                `flex flex-row px-2 py-1 rounded-full items-center bg-${typeColor}-100 self-start mr-2 mb-2`
              )}>
              <SpotIcon type='food' color={typeColor} icon='pizza' classes='mr-1 max-h-4' />
              <AppText style={style(`text-xs font-medium text-${typeColor}-300`)}>Pizza</AppText>
            </View>
            <View
              style={style(
                `flex flex-row px-2 py-1 rounded-full items-center bg-${typeColor}-100 self-start mr-2 mb-2`
              )}>
              <SpotIcon type='food' color={typeColor} icon='icecream' classes='mr-1 max-h-4' />
              <AppText style={style(`text-xs font-medium text-${typeColor}-300 w-auto`)}>
                Glaces
              </AppText>
            </View>
            <View
              style={style(
                `flex flex-row px-2 py-1 rounded-full items-center bg-${typeColor}-100 self-start mr-2 mb-2`
              )}>
              <SvgFamily fill={Palette[typeColor][300]} classes='mr-1 max-h-4 max-w-5' />
              <AppText style={style(`text-xs font-medium text-${typeColor}-300 w-auto`)}>
                Famille
              </AppText>
            </View>
            <View
              style={style(
                `flex flex-row px-2 py-1 rounded-full items-center bg-${typeColor}-100 self-start mr-2 mb-2`
              )}>
              <SvgFriends fill={Palette[typeColor][300]} classes='mr-1 max-h-4 max-w-4' />
              <AppText style={style(`text-xs font-medium text-${typeColor}-300 w-auto`)}>
                Amis
              </AppText>
            </View>
            <View
              style={style(
                `flex flex-row px-2 py-1 rounded-full items-center bg-${typeColor}-100 self-start mr-2 mb-2`
              )}>
              <SvgSofa fill={Palette[typeColor][300]} classes='mr-1 max-h-4 max-w-4' />
              <AppText style={style(`text-xs font-medium text-${typeColor}-300 w-auto`)}>
                Décontracté
              </AppText>
            </View>
          </View>
        </View>
        {placeInfos && <OpeningTime placeInfos={placeInfos} />}
        <SpotDescription description={spot?.details.description ?? ''} />
        {placeInfos && <SpotReviews placeResult={placeInfos} />}
        {placeInfos && <SpotLocation spot={spot} placeResult={placeInfos} />}
        <View
          style={style('flex flex-col w-full max-w-[90vw] mx-5 px-5 py-6 bg-cream rounded-xl mt-6')}
        />
      </ScrollView>
    </SafeAreaView>
  );
};
