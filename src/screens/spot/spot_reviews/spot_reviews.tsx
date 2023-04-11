import { google } from 'google-maps';
import { Image, View } from 'react-native';
import tw from '../../../../lib/tailwind';
import React from 'react';
import { AppText } from '../../../components/appText';
import { StarIcon } from 'react-native-heroicons/solid';

type PlaceResult = google.maps.places.PlaceResult;
type PlaceReview = google.maps.places.PlaceReview;
const { style } = tw;

const Review = ({ review }: { review: PlaceReview }) => {
  return (
    <View style={style('flex flex-row w-full items-start mt-4 bg-white rounded-xl px-5 py-6')}>
      <View style={style('flex flex-col')}>
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
        <View style={style('flex flex-row items-center mt-2')}>
          <AppText style={style('text-xl font-medium ml-1')}>{review.rating} / 5</AppText>
          <StarIcon style={style('text-yellow ml-1')} />
        </View>
      </View>
      <View style={style('flex flex-col ml-4')}>
        <AppText style={style('text-base font-700')}>{review.author_name}</AppText>
        <AppText style={style('text-sm text-secondary-300 font-700')}>
          {review.relative_time_description}
        </AppText>
        <AppText
          numberOfLines={3}
          ellipsizeMode='tail'
          adjustsFontSizeToFit={false}
          style={style('text-sm text-gray-400 mt-1 max-w-[60vw] font-300')}>
          {review.text}
        </AppText>
      </View>
    </View>
  );
};
export const SpotReviews = ({ placeResult }: { placeResult: PlaceResult }) => {
  const reviews = placeResult?.reviews;
  return (
    <View style={style('flex flex-col w-full max-w-[90vw] mx-5 bg-cream rounded-xl my-6')}>
      <AppText style={style('text-xl font-600')}>Critiques et évaluations</AppText>
      {reviews?.map((review, index) => (
        <Review key={index} review={review} />
      ))}
    </View>
  );
};
