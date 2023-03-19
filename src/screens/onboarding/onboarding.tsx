import React, {
  useCallback,
  useRef,
  useState,
  useMemo,
  useContext,
  useEffect,
  ReactElement,
  memo
} from 'react';
import { FlatList, View, Dimensions, Text, Image, SafeAreaView } from 'react-native';
import { AppText } from '../../components/appText';
import { Trans, useTranslation } from 'react-i18next';
import { Button } from '../../components/buttons';
import { useNavigate } from 'react-router-dom';
import { SvgCozette } from '../../../assets/svg_components/svg_cozette';
import { SvgOnboardingOne } from '../../../assets/svg_components/onboarding/svg_onboarding_one';
import tw from '../../../lib/tailwind';
import { SvgOnboardingThree } from '../../../assets/svg_components/onboarding/svg_onboarding_three';
import { SvgOnboardingTwo } from '../../../assets/svg_components/onboarding/svg_onboarding_two';
import { SvgArrowRight } from '../../../assets/svg_components/svg_arrow_right';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { style } = tw;

const { width: windowWidth, height: windowHeight } = Dimensions.get('window');

interface SlideList {
  image: ReactElement;
  title: string;
  description: string;
}

const slideList = [
  {
    image: <SvgOnboardingOne classes='max-h-50 md:max-h-64' />,
    title: 'Onboarding.title.1',
    description: 'Onboarding.description.1'
  },
  {
    image: <SvgOnboardingTwo classes='max-h-50 md:max-h-64' />,
    title: 'Onboarding.title.2',
    description: 'Onboarding.description.2'
  },
  {
    image: <SvgOnboardingThree classes='max-h-50 md:max-h-64' />,
    title: 'Onboarding.title.3',
    description: 'Onboarding.description.3'
  }
] as SlideList[];

const Pagination = ({ index }: { index: number }) => {
  return (
    <View style={style('w-full mt-10 justify-center flex flex-row h-auto')} pointerEvents='none'>
      {slideList.map((element, i) => {
        return (
          <View
            key={`paginationElement${i}`}
            style={style(
              `h-[6px] rounded-lg mx-1 border-[1px] border-cream w-20 ${
                index === i ? 'bg-primary-300' : 'bg-primary-100'
              }`
            )}
          />
        );
      })}
    </View>
  );
};

export const Onboarding = () => {
  const [index, setIndex] = useState<number>(0);
  const [path, setPath] = useState<string | null>(null);
  const navigate = useNavigate();
  const memoIndex = useMemo(() => {
    return index;
  }, [index]);
  const indexRef = useRef(index);
  indexRef.current = index;
  const manualScroll = (index: number) => {
    indexRef.current = index;
    setIndex(index);
  };
  useEffect(() => {
    if (path) {
      navigate(path);
    }
  }, [path]);
  const checkUid = async () => {
    try {
      const value = await AsyncStorage.getItem('@userUid');
      if (value !== null) {
        console.log('ok we have a value', value);
        setPath('/');
      }
    } catch (e) {
      console.log('error getting uid', e);
    }
  };
  useEffect(() => {
    checkUid().then(() => console.log('done'));
  }, []);
  const onScroll = useCallback((event: any) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const index = event.nativeEvent.contentOffset.x / slideSize;
    const roundIndex = Math.round(index);

    const distance = Math.abs(roundIndex - index);
    const isNoMansLand = 0.4 < distance;

    if (roundIndex !== indexRef.current && !isNoMansLand) {
      setIndex(roundIndex);
    }
  }, []);
  const { t } = useTranslation();
  const flatListOptimizationProps = {
    initialNumToRender: 0,
    maxToRenderPerBatch: 1,
    removeClippedSubviews: true,
    scrollEventThrottle: 16,
    windowSize: 2,
    getItemLayout: useCallback(
      (_, index) => ({
        index,
        length: windowWidth,
        offset: index * windowWidth
      }),
      []
    )
  };
  const Slide: React.FC<{ index: number }> = ({ index }) => {
    return (
      <View
        style={style(`w-[${windowWidth}px] justify-start items-center px-8`)}
        key={`slideElement${index}`}>
        {slideList[memoIndex].image}
        <Pagination index={memoIndex} />
        <View style={style('w-full mt-12 h-[1px] bg-gray-100')} />
        <View style={style('w-full max-w-[90%] justify-start')}>
          <AppText style={style('text-2xl md:text-2.5xl font-medium mt-4 text-left leading-7')}>
            <Trans
              i18nKey={slideList[memoIndex].title}
              components={[<Text key={index} style={style('text-secondary-300')} />]}
            />
          </AppText>
          <AppText style={style('text-sm md:text-base mt-4 text-left text-gray-500 leading-4')}>
            <Trans
              i18nKey={slideList[memoIndex].description}
              components={[<Text key={index} style={style('font-bold')} />]}
            />
          </AppText>
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView style={style('h-full flex flex-col items-center justify-between bg-cream')}>
      <View style={style('w-full max-h-[80%] h-full flex flex-col justify-center items-center')}>
        <SvgCozette classes='my-10' />
        <FlatList
          data={slideList}
          renderItem={Slide}
          initialScrollIndex={index}
          pagingEnabled
          horizontal
          showsHorizontalScrollIndicator={false}
          bounces={false}
          onScroll={onScroll}
          style={style('flex-1 max-h-[80%] h-full border-[1px] border-cream')}
          {...flatListOptimizationProps}
        />
      </View>
      {index === 2 ? (
        <View style={style('w-full max-h-[10%] h-full flex flex-col justify-center items-center')}>
          <Button
            content='On y va !'
            variant='contained'
            color='primary'
            buttonClasses='rounded-xl w-[80%] py-2'
            contentClasses='text-lg'
            onPress={() => navigate('/register')}
          />
        </View>
      ) : (
        <View
          style={style(
            'w-full flex flex-row justify-between items-center px-8 max-h-[10%] h-full'
          )}>
          <Button
            content={t('Main.skip') ?? ''}
            variant='text'
            color='gray'
            contentClasses='text-lg font-800 underline'
            onPress={() => navigate('/register')}
          />
          <Button
            content={t('Main.next') ?? ''}
            variant='contained'
            color='primary'
            buttonClasses='rounded-full flex justify-center w-10 h-10'
            onPress={() => manualScroll(index + 1)}>
            <SvgArrowRight />
          </Button>
        </View>
      )}
    </SafeAreaView>
  );
};
