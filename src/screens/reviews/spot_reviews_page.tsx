import tw from '../../../lib/tailwind';
import React, { useEffect, useState } from 'react';
import { Image, Pressable, SafeAreaView, ScrollView, Text, View } from 'react-native';
import { AppText } from '../../components/appText';
import { useLocation, useNavigate } from 'react-router-dom';
import { getPlaceReviews } from '../../actions/places';
import { google } from 'google-maps';
import { StarIcon } from 'react-native-heroicons/solid';
import { Trans } from 'react-i18next';
import { SvgArrowLeft } from '../../../assets/svg_components/svg_arrow_left';
import { Palette } from '../../../lib/palette';

type PlaceResult = google.maps.places.PlaceResult;
type PlaceReview = google.maps.places.PlaceReview;

const { style } = tw;

const Review = ({ review }: { review: PlaceReview }) => {
  return (
    <View style={style('flex flex-row w-full items-start mt-4 bg-white rounded-xl px-5 py-6')}>
      <View style={style('flex flex-col w-full')}>
        <View style={style('flex flex-row items-center justify-start')}>
          <View
            style={style(
              'flex w-[20vw] h-[20vw] justify-center items-center overflow-hidden flex-col rounded-lg'
            )}>
            <Image
              source={{
                uri: review.profile_photo_url
              }}
              style={style('w-[30vw] h-[30vw]')}
            />
          </View>
          <View style={style('flex flex-col items-start justify-start ml-6 w-[60vw]')}>
            <View style={style('flex flex-row items-center justify-between w-[60vw]')}>
              <AppText style={style('text-sm text-secondary-300 font-600')}>
                {review.relative_time_description}
              </AppText>
              <View style={style('flex flex-row items-center')}>
                <AppText style={style('text-sm font-600 ml-1')}>{review.rating} / 5</AppText>
                <StarIcon style={style('text-yellow ml-1 max-h-4')} />
              </View>
            </View>
            <AppText style={style('text-xl font-700 mt-2 text-left w-full')}>
              {review.author_name}
            </AppText>
          </View>
        </View>
        <AppText style={style('text-sm text-gray-400 mt-4 w-full font-300')}>{review.text}</AppText>
      </View>
    </View>
  );
};
const StatsRow = ({ label, total, count }: { label: string; total: number; count: number }) => {
  const ratio = count / total;
  const availableWidth = 65;
  const coloredWidth = Math.max(availableWidth * ratio, 1);
  const emptyWidth = availableWidth - coloredWidth;
  return (
    <View style={style('flex flex-row items-center justify-between w-full my-1')}>
      <View style={style('flex flex-row items-center justify-start w-[5vw]')}>
        <AppText style={style('text-sm text-gray-400 font-600')}>{label}</AppText>
        <StarIcon style={style('text-yellow ml-1 max-h-4')} />
      </View>
      <View style={style('flex flex-row items-center justify-center w-[65vw]')}>
        <View style={style(`bg-primary-300 h-1 rounded-l-full w-[${coloredWidth}vw]`)} />
        <View style={style(`bg-gray-100 h-1  rounded-r-full w-[${emptyWidth}vw]`)} />
      </View>
      <AppText style={style('text-sm font-600 w-[5vw]')}>{count}</AppText>
    </View>
  );
};
const ReviewsHeader = ({ placeInfos }: { placeInfos: PlaceResult | null }) => {
  const [mappedCounts, setMappedCounts] = useState<{
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
  }>({
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0
  });
  if (!placeInfos) {
    return null;
  }
  const countReviewsByRating = () => {
    const count = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0
    };

    placeInfos?.reviews?.forEach((review) => {
      // @ts-ignore
      count[review.rating] += 1;
    });
    setMappedCounts(count);
  };
  useEffect(() => {
    countReviewsByRating();
  }, [placeInfos?.reviews]);
  const navigate = useNavigate();
  return (
    <View style={style('flex flex-col w-full items-start bg-cream rounded-xl px-5 py-6')}>
      <Pressable style={style('bg-white p-3 rounded-full')} onPress={() => navigate(-1)}>
        <SvgArrowLeft classes='max-w-6 max-h-6 text-gray-400' fill={Palette['gray'][100]} />
      </Pressable>
      <View style={style('flex flex-row items-center justify-between w-full mt-6')}>
        <AppText style={style('text-xl font-700 max-w-[50vw]')}>
          <Trans
            i18nKey='Spot.reviews.title'
            components={[<Text key='bold_element' style={style('font-700 text-secondary-300')} />]}
            values={{ count: placeInfos?.reviews?.length }}
          />
        </AppText>
        <View style={style('flex flex-row items-center')}>
          <AppText style={style('text-lg font-600 ml-1')}>{placeInfos.rating} / 5</AppText>
          <StarIcon style={style('text-yellow ml-1 max-h-6')} />
        </View>
      </View>
      <View style={style('flex flex-col w-full mt-4')}>
        {Object.entries(mappedCounts || {})
          .sort(([keyA, valueA], [keyB, valueB]) => parseInt(keyB) - parseInt(keyA))
          .map(([key, value]) => (
            <StatsRow key={key} count={value} total={placeInfos.reviews?.length ?? 0} label={key} />
          ))}
      </View>
    </View>
  );
};
export const SpotReviewsPage = () => {
  const location = useLocation();
  const path = location.pathname;
  const placeId = path.substring(path.lastIndexOf('/') + 1);
  const [loading, setLoading] = useState<boolean>(true);
  const [placeInfos, setPlaceInfos] = useState<PlaceResult | null>(null);
  async function fetchData() {
    const fetchedInfos = (await getPlaceReviews(placeId ?? '')) as any;
    setPlaceInfos(fetchedInfos.result);
  }
  useEffect(() => {
    fetchData().then(() => setLoading(false));
  }, [placeId]);
  if (loading) {
    return null;
  }
  return (
    <SafeAreaView style={style('flex flex-col w-full bg-cream items-center justify-center')}>
      <ScrollView style={style('w-full flex flex-col')}>
        <View style={style('flex flex-col w-full overflow-hidden relative bg-cream max-w-[100vw]')}>
          <ReviewsHeader placeInfos={placeInfos} />
          {placeInfos?.reviews?.map((review: PlaceReview, index) => (
            <Review review={review} key={index} />
          ))}
        </View>
        <View
          style={style('flex flex-col w-full max-w-[90vw] mx-5 px-5 py-6 bg-cream rounded-xl mt-6')}
        />
      </ScrollView>
    </SafeAreaView>
  );
};
