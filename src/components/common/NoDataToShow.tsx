import React, { FC } from 'react';
import { Image, StyleProp, Text, TextStyle, View, ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';
import { commonStyles } from '../../constants/commonStyles';
import colors from '../../constants/colors';

type NoDataToShowProp = {
    title: string,
    style?: StyleProp<ViewStyle>
    textStyle?: StyleProp<TextStyle>
    scaleRatio: number
}
const NoDataToShow: FC<NoDataToShowProp> = ({
    title,
    style,
    textStyle,
    scaleRatio
}) => {
    let ratioScale = scaleRatio ? scaleRatio : 2
    return (
        <>
            <View style={[styles.emptyContainer, style]}>
                <Image source={require("../../assets/empty-list-graphic.png")} style={{ resizeMode: 'center', height: height / ratioScale, width }} />
                <Text style={[commonStyles.text18, textStyle, { color: colors.COLORPRIMARY }]}>{title}</Text>
            </View >
        </>
    );
}

export default NoDataToShow
const height = Dimensions.get('window').height
const width = Dimensions.get('window').width
const styles = StyleSheet.create({

    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})

