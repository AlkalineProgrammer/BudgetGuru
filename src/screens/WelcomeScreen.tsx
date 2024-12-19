import React, { useState, useRef } from 'react';
import {
    View,
    StyleSheet,
    FlatList,
    Animated,
    BackHandler,
    StatusBar,
} from 'react-native';
import slides from "../components/carousel/slides";
import WelcomeScreenItems from '../components/carousel/WelcomeScreenItems';
import Paginator from '../components/carousel/Paginator';
import { useEffect } from 'react';
import WelcomeScreenFooter from '../components/carousel/WelcomeScreenFooter';
import { useNavigation, useRoute } from '@react-navigation/native';
const WelcomeScreen = () => {
    const scrollX = useRef(new Animated.Value(0)).current;
    const slidesRef = useRef<FlatList<any>>(null);
    const [index, setIndex] = useState(0);
    const [arrowColor, setArrorColor] = useState<string>('#000')
    const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;
    useEffect(() => {
        if (slidesRef.current) {
            slidesRef.current?.scrollToIndex({
                index,
                animated: true,
                viewPosition: 0.5
            })
        }

    }, [index])
    useEffect(() => {
        const backAction = () => {
            BackHandler.exitApp();
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction,
        );

        return () => backHandler.remove();
    }, []);

    return (
        <>
            <View style={styles.container}>
                <View style={{ flex: 1 }}>
                    <FlatList
                        ref={slidesRef}
                        data={slides}
                        renderItem={({ item }) => <WelcomeScreenItems item={item} index={index + 1} sendColor={setArrorColor} />}
                        horizontal
                        initialScrollIndex={index}
                        showsHorizontalScrollIndicator={false}
                        pagingEnabled
                        bounces={false}
                        keyExtractor={(item) => item.id}
                        onScroll={Animated.event(
                            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                            { useNativeDriver: false },
                        )}
                        scrollEventThrottle={32}
                        viewabilityConfig={viewConfig}

                    />
                </View>
                <WelcomeScreenFooter color={arrowColor} selectedTab={setIndex} />
                <View style={{ marginTop: '5%' }}>
                    <Paginator data={slides} scrollX={scrollX} />
                </View>
            </View>
        </>
    );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});