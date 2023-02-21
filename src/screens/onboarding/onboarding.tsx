import React, {useCallback, memo, useRef, useState, useMemo} from "react";
import {
    FlatList,
    View,
    Dimensions,
    Text,
    Image,
} from "react-native";
import tw from "twrnc";
import {AppText} from "../../components/appText";
import {useTranslation} from "react-i18next";
import {SimpleButton} from "../../components/buttons";
import {useNavigate} from "react-router-dom";

const { style } = tw;

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

interface SlideList {
    title: string;
    description: string;
}

const slideList = [
    {
        title: 'Onboarding.title.1',
        description: 'Onboarding.description.1',
    },
    {
        title: 'Onboarding.title.2',
        description: 'Onboarding.description.2',
    },
    {
        title: 'Onboarding.title.3',
        description: 'Onboarding.description.3',
    }
] as SlideList[];

const Pagination = ({index}: { index: number }) => {
    return (
        <View style={style('w-full mt-4 justify-center flex flex-row h-[5%]')} pointerEvents="none">
            {slideList.map((element, i) => {
                return (
                    <View
                        key={`paginationElement${i}`}
                        style={style(`h-3.5 rounded-lg mx-1 border-[1px] border-white ${index === i ? "w-12 bg-indigo-500" : "w-3.5 bg-gray-300"}`)}
                    />
                );
            })}
        </View>
    );
}

export const Onboarding = () => {
    const [index, setIndex] = useState<number>(0);
    const navigate = useNavigate();
    const redirect = (path: string) => {
        navigate(path);
    };
    const memoIndex = useMemo(() => {
        return index;
    }, [index]);
    const indexRef = useRef(index);
    indexRef.current = index;
    const manualScroll = (index: number) => {
        indexRef.current = index;
        setIndex(index);
    };
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
                offset: index * windowWidth,
            }),
            []
        ),
    };
    const Slide: React.FC<{index: number}> = ({index}) => {
        return (
            <View style={style(`w-[${windowWidth}px] justify-start items-center px-8`)} key={`slideElement${index}`}>
                <View style={style(`w-60 h-60 bg-indigo-100 rounded-xl items-center justify-center`)}>
                    <AppText style={style('text-lg')}>{memoIndex}</AppText>
                </View>
                <AppText style={style('text-3xl mt-8 text-center')}>{t(slideList[memoIndex].title)}</AppText>
                <AppText style={style('text-lg mt-2 text-center text-gray-500 px-4')}>{t(slideList[memoIndex].description)}</AppText>
            </View>
        );
    };
    return (
        <View style={style('h-full flex flex-col items-center')}>
            <Image source={require('../../../assets/Cozette.png')} style={style('w-1/2 h-[20%]')} resizeMode="contain" />
            <View style={style('w-full h-[60%] flex flex-col justify-center items-center')}>
            <FlatList
                data={slideList}
                renderItem={Slide}
                initialScrollIndex={index}
                pagingEnabled
                horizontal
                showsHorizontalScrollIndicator={false}
                bounces={false}
                onScroll={onScroll}
                style={style('flex-1 h-[55%] h-auto border-[1px] border-white')}
                {...flatListOptimizationProps}
            />
            <Pagination index={index} />
            </View>
            {index === 2 ? (
                <View style={style('w-full h-[20%] flex flex-col justify-center items-center')}>
                    <SimpleButton content="On y va !" variant="contained" color="primary" buttonClasses="rounded-xl w-[80%] py-2" contentClasses="text-lg" onPress={() => redirect('/register')} />
                </View>
                ) : (
                <View style={style('w-full flex flex-row justify-between items-center px-8 h-[20%]')}>
                    <SimpleButton content="Passer" variant="text" color="primary" contentClasses="text-lg" />
                    <SimpleButton content="Suivant" variant="contained" color="primary" buttonClasses="px-8 rounded-xl" contentClasses="text-lg" onPress={() => manualScroll(index + 1)} />
                </View>
            )}
        </View>
    );
}
