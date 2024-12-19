import {
    Animated,
    ColorValue,
    StyleSheet,
    useWindowDimensions,
    View,
} from 'react-native';
import React, { FC, useEffect, useRef, useState } from 'react';
import colors from '../../constants/colors'

type PaginatorProp = {
    data: any,
    scrollX: any
}
const Paginator: FC<PaginatorProp> = ({ data, scrollX }) => {
    const { width } = useWindowDimensions();
    return (
        <View style={{ flexDirection: 'row', height: 32 }}>
            {data.map((_: any, id: number) => {
                const inputRange = [(id - 1) * width, id * width, (id + 1) * width];
                const dotWidth = scrollX.interpolate({
                    inputRange,
                    outputRange: [10, 20, 10],
                    extrapolate: 'clamp',
                });
                const opacity = scrollX.interpolate({
                    inputRange,
                    outputRange: [0.3, 1, 0.3],
                    extrapolate: 'clamp',
                });
                return (
                    <Animated.View
                        style={[styles.dot, { width: dotWidth, opacity, backgroundColor: _.color }]}
                        key={id.toString()}
                    />
                );
            })}
        </View>
    );
};

export default Paginator;

const styles = StyleSheet.create({
    dot: {
        height: 10,
        borderRadius: 5,
        // backgroundColor: colors.COLORPRIMARY,
        marginHorizontal: 8,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});