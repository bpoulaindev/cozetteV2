import React, { useCallback, memo, useRef, useState } from "react";
import {
    FlatList,
    View,
    Dimensions,
    Text,
    Image,
} from "react-native";
import tw from "twrnc";
import {AppText} from "../../components/appText";

const { style } = tw;

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

const slideList = Array.from({ length: 3 }).map((_, i) => {
    return {
        id: i,
        image: `https://picsum.photos/1440/2842?random=${i}`,
        title: `This is the title ${i + 1}!`,
        subtitle: `This is the subtitle ${i + 1}!`,
    };
});

const Slide = ({index}: {index: number}) => {
    return (
        <View style={style(`w-[${windowWidth}px] justify-center items-center`)}>
            <View style={style(`w-60 h-60 bg-indigo-100 rounded-xl items-center justify-center`)}>
                <AppText style={style('text-lg')}>{index}</AppText>
            </View>
        </View>
    );
};

const Pagination = ({index}: { index: number }) => {
    return (
        <View style={style('w-full mt-4 justify-center flex flex-row')} pointerEvents="none">
            {slideList.map((_, i) => {
                return (
                    <View
                        key={i}
                        style={style(`h-2 rounded-lg mx-1 ${index === i ? "w-4 bg-indigo-500" : "w-2 bg-gray-300"}`)}
                    />
                );
            })}
        </View>
    );
}

export const Onboarding = () => {
    const [index, setIndex] = useState<number>(0);
    const indexRef = useRef(index);
    indexRef.current = index;
    const onScroll = useCallback((event: any) => {
        const slideSize = event.nativeEvent.layoutMeasurement.width;
        const index = event.nativeEvent.contentOffset.x / slideSize;
        const roundIndex = Math.round(index);

        const distance = Math.abs(roundIndex - index);

        // Prevent one pixel triggering setIndex in the middle
        // of the transition. With this we have to scroll a bit
        // more to trigger the index change.
        const isNoMansLand = 0.4 < distance;

        if (roundIndex !== indexRef.current && !isNoMansLand) {
            setIndex(roundIndex);
        }
    }, []);

    const flatListOptimizationProps = {
        initialNumToRender: 0,
        maxToRenderPerBatch: 1,
        removeClippedSubviews: true,
        scrollEventThrottle: 16,
        windowSize: 2,
        keyExtractor: useCallback(s => String(s.id), []),
        getItemLayout: useCallback(
            (_, index) => ({
                index,
                length: windowWidth,
                offset: index * windowWidth,
            }),
            []
        ),
    };

    return (
        <View style={style('h-full flex flex-col justify-start')}>
            <FlatList
                data={slideList}
                renderItem={Slide}
                pagingEnabled
                horizontal
                showsHorizontalScrollIndicator={false}
                bounces={false}
                onScroll={onScroll}
                style={style('flex-1 max-h-80 h-auto mt-8')}
                {...flatListOptimizationProps}
            />
            <Pagination index={index} />
            <AppText>Test</AppText>
        </View>
    );
}
