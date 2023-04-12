import { google } from 'google-maps';
import { Image, Pressable, Text, View } from 'react-native';
import tw from '../../../../lib/tailwind';
import React from 'react';
import { AppText } from '../../../components/appText';
import { StarIcon } from 'react-native-heroicons/solid';
import { Button } from '../../../components/buttons';
import { SvgArrowRight } from '../../../../assets/svg_components/svg_arrow_right';
import { Palette } from '../../../../lib/palette';
import { useNavigate } from 'react-router-dom';
import App from '../../../../App';
import { Trans } from 'react-i18next';

type PlaceResult = google.maps.places.PlaceResult;
type PlaceReview = google.maps.places.PlaceReview;

const { style } = tw;

const Review = ({ review, placeId }: { review: PlaceReview; placeId: string }) => {
  const navigate = useNavigate();
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
        <View style={style('flex flex-row items-center mt-6')}>
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
        <Pressable
          style={style('flex flex-row items-center mt-2')}
          onPress={() => navigate(`/reviews/${placeId}`)}>
          <AppText style={style('text-sm font-700 underline')}>Lire la suite</AppText>
          <SvgArrowRight classes='ml-1.5 max-w-5 max-h-3' fill={Palette.gray[300]} />
        </Pressable>
      </View>
    </View>
  );
};
export const SpotReviews = ({ placeResult }: { placeResult: PlaceResult }) => {
  const reviews = placeResult?.reviews;
  const navigate = useNavigate();
  return (
    <View style={style('flex flex-col w-full max-w-[90vw] mx-5 bg-cream rounded-xl my-6')}>
      <View style={style('flex flex-row items-center justify-between')}>
        <View style={style('flex flex-row items-center flex-wrap max-w-[60vw] px-5')}>
          <AppText style={style('text-xl font-600')}>
            <Trans
              i18nKey='Spot.reviews.title'
              components={[
                <Text key='bold_element' style={style('font-bold text-secondary-300')} />
              ]}
              values={{ count: placeResult?.user_ratings_total }}
            />
          </AppText>
        </View>
        <Button
          color='gray'
          variant='text'
          content='Tout afficher'
          contentClasses='font-600 underline rounded-lg px-2 py-1'
          onPress={() => navigate(`/reviews/${placeResult?.place_id}`)}
        />
      </View>
      {reviews
        ?.sort((reviewA, reviewB) => reviewB.time - reviewA.time)
        .slice(0, 3)
        .map((review, index) => (
          <Review key={index} review={review} placeId={placeResult?.place_id ?? ''} />
        ))}
    </View>
  );
};
