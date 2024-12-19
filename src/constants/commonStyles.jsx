import { Dimensions, Platform, PlatformColor, StyleSheet } from 'react-native';

import colors from './colors'

/**
 * mr - margin right
 * ml - margin left
 * mt - margin top
 * p  - padding
 * px - padding horizontal
 */

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

/// common stlye export
let font = 'Montserrat-Regular';

var commonStyles1 = StyleSheet.create();
if (Platform.OS == 'android') {
    commonStyles1 = StyleSheet.create({
        textFont: {
            fontFamily: 'Montserrat-Regular',
        },

        row: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        column: {
            flexDirection: 'column',
        },
        mr12: {
            marginRight: 12,
        },
        mt12: {
            marginTop: 12,
        },
        mt10: {
            marginTop: 10,
        },
        mr4: {
            marginRight: 4,
        },
        mb12: {
            marginBottom: 12,
        },
        upperCase: {
            textTransform: 'uppercase',
        },
        borderRound: {
            borderWidth: 1,
            borderRadius: 100,
        },
        whiteBackgroundContainer: {
            backgroundColor: colors.WHITE,
            flex: 1,
        },
        bold: {
            fontWeight: 'bold',
        },
        fill: {
            flex: 1,
        },
        capitalize: {
            textTransform: 'capitalize',
        },
        positiveText: {
            color: colors.MATERIAL_GREEN,
            fontFamily: font,
        },
        negativeText: {
            color: colors.MATERIAL_RED,
            fontFamily: font,
        },
        centerAlignedText: {
            textAlign: 'center',
        },
        centerAligned: {
            justifyContent: 'center',
            alignItems: 'center',
        },
        highlightedInfoText: {
            fontSize: 12,
            backgroundColor: colors.COLORPRIMARY,
            padding: 8,
            borderRadius: 2,
        },
        // use CustomCard when background is non-white else use this style
        card: {
            borderTopWidth: 1,
            borderRightWidth: 1,
            borderBottomWidth: 2,
            borderLeftWidth: 1,
            borderRadius: 5,
            padding: 12,
            backgroundColor: colors.WHITE,
        },
        underline: {
            textDecorationLine: 'underline',
        },
        horizontalScrollView: {
            marginVertical: 10,
            paddingHorizontal: 10,
        },

        marginHorizontal: {
            marginHorizontal: 10,
        },
        marginHorizontal15: {
            marginHorizontal: 15,
            marginTop: 10,
        },
        marginHorizontal20: {
            marginHorizontal: 20,
        },
        rightAligned: {
            justifyContent: 'flex-end',
        },

        inputText: {
            borderRadius: 10,
            borderWidth: 1,
            backgroundColor: 'transparent',
            width: '100%',
            paddingHorizontal: 5,
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignSelf: 'center',
            height: 50,
        },
        inputArea: {
            borderRadius: 10,
            borderWidth: 1,
            backgroundColor: 'transparent',
            width: '100%',
            paddingHorizontal: 5,
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignSelf: 'center',
            height: 150,
        },
        titleStyle: {
            fontSize: 15,
            fontFamily: 'Montserrat-Regular',
            fontWeight: '600',
            marginHorizontal: 15,
        },

        titleView: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
        },

        betweenTwoView: {
            marginTop: 10,
            marginBottom: 10,
        },

        betweenTwoView2: {
            marginTop: 5,
            marginBottom: 5,
        },

        card1WidthH: {
            width: windowWidth / 1 - 25,
            marginHorizontal: 5,
        },
        card1Width: {
            width: windowWidth / 1 - 25,
        },
        card2Width: {
            width: windowWidth / 2 - 20,
        },
        card3Width: {
            width: windowWidth / 3 - 15,
        },
        dashBoardCards: {
            shadowColor: 'black',
            shadowOpacity: 0.26,
            shadowOffset: { width: 0, height: 2 },
            shadowRadius: 8,
            elevation: 3,
            backgroundColor: 'white',
            borderRadius: 10,
            padding: 10,
            marginHorizontal: 5,
            backgroundColor: colors.BACKGROUND,
            alignSelf: 'center',
            marginBottom: 5,
        },

        cardPromo: {
            shadowColor: 'black',
            shadowOpacity: 0.26,
            shadowOffset: { width: 0, height: 2 },
            shadowRadius: 8,
            elevation: 3,
            backgroundColor: 'white',
            borderRadius: 20,
            paddingHorizontal: 10,
            marginHorizontal: 5,
            backgroundColor: '#fff',
            alignSelf: 'center',
            alignItems: 'center',
            marginBottom: 5,
        },

        imageIcon50: {
            height: 50,
            width: 50,
            borderRadius: 100,
        },

        imageIcon100: {
            height: 100,
            width: 100,
            borderRadius: 100,
        },

        image100: {
            height: 100,
            width: 100,
        },
        imageIcon30: {
            height: 30,
            width: 30,
        },

        iconMed: {
            height: 35,
            width: 35,
        },

        icon20: {
            height: 20,
            width: 20,
        },

        flatListStyle: {
            paddingHorizontal: 10,
            paddingVertical: 10,
        },

        Screen: {
            flex: 1,
            backgroundColor: colors.BACKGROUND,
        },
        text12: {
            color: colors.BLACK,
            fontSize: 12,
            fontFamily: font,
        },
        text12White: {
            color: colors.WHITE,
            fontSize: 12,
            fontFamily: font,
        },
        text14WhiteBold: {
            color: colors.WHITE,
            fontSize: 14,
            fontFamily: font,
            fontWeight: 'bold',
        },
        text14BlackBold: {
            color: colors.BLACK,
            fontSize: 14,
            fontFamily: font,
            fontWeight: 'bold',
        },
        text12Gray: {
            color: colors.GREYISH,
            fontSize: 12,
            fontFamily: font,
        },
        text12Blue: {
            color: colors.COLORPRIMARY,
            fontSize: 12,
            fontFamily: font,
        },
        text12Red: {
            color: colors.MATERIAL_RED,
            fontSize: 12,
            fontFamily: font,
        },
        text10: {
            color: colors.BLACK,
            fontSize: 10,
            fontFamily: font,
        },
        text10White: {
            color: colors.WHITE,
            fontSize: 10,
            fontFamily: font,
        },
        text10Gray: {
            color: colors.GREYISH,
            fontSize: 10,
            fontFamily: font,
        },
        text10Blue: {
            color: colors.COLORPRIMARY,
            fontSize: 10,
            fontFamily: font,
        },
        text10Red: {
            color: colors.MATERIAL_RED,
            fontSize: 10,
            fontFamily: font,
        },
        text15: {
            color: colors.BLACK,
            fontSize: 15,
            fontFamily: font,
        },
        text15White: {
            color: colors.WHITE,
            fontSize: 15,
            fontFamily: font,
        },
        text15Gray: {
            color: colors.GREYISH,
            fontSize: 15,
            fontFamily: font,
        },
        text15Blue: {
            color: colors.COLORPRIMARY,
            fontSize: 15,
            fontFamily: font,
        },
        text15Red: {
            color: colors.MATERIAL_RED,
            fontSize: 15,
            fontFamily: font,
        },
        text18: {
            color: colors.BLACK,
            fontSize: 18,
            fontFamily: font,
        },
        text18Bold: {
            color: colors.BLACK,
            fontSize: 18,
            fontFamily: font,
            fontWeight: 'bold',
        },
        text25: {
            color: colors.BLACK,
            fontSize: 25,
            fontFamily: font,
        },
        roundBorderText: {
            // backgroundColor: '#f8c548',
            borderRadius: 20,
            paddingVertical: 3,
            paddingHorizontal: 5,
            height: 20,
        },
        //// houseHold
        houseHoldCard: {
            backgroundColor: '#fff',
            borderRadius: 10,
            margin: 5,
            alignSelf: 'center',
            paddingVertical: 10,
            alignItems: 'center',
            justifyContent: 'center',
        },
        houseHoldCardImage: {
            marginHorizontal: 20,
            alignSelf: 'center',
            height: 70,
            width: 70,
            borderRadius: 50,
        },
        houseHoldCardImage2: {
            marginHorizontal: 20,
            alignSelf: 'center',
            height: 70,
            width: 70,
            borderRadius: 50,
        },
        houseHoldCardText1: {
            alignSelf: 'center',
            marginTop: 5,
            fontFamily: font,
        },
        houseHoldCardText2: {
            alignSelf: 'center',
            color: 'gray',
            fontFamily: font,
        },
        houseHoldCardButtonView: {
            flexDirection: 'row',
            paddingHorizontal: 15,
            marginTop: 10,
            width: 150,
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        houseHoldCardButton: {
            borderColor: 'gray',
            borderWidth: 1,
            borderRadius: 100,
            padding: 2,
            shadowColor: 'black',
            shadowOpacity: 0.26,
            shadowOffset: { width: 0, height: 5 },
            shadowRadius: 100,
            elevation: 10,
            backgroundColor: 'white',
        },
        addText: {
            color: colors.COLORPRIMARY,
            fontWeight: 'bold',
            marginRight: 15,
            fontFamily: font,
            textAlign: 'center'
        },

        /////complain
        textTitle: {
            fontFamily: font,
            fontSize: 18,
            textTransform: 'uppercase',
            color: 'black',
            fontWeight: '800',
        },

        textTitleWhite: {
            fontFamily: font,
            fontSize: 18,
            textTransform: 'uppercase',
            color: 'white',
            fontWeight: '900',
            textAlign: 'center'
        },
    });
} else {
    commonStyles1 = StyleSheet.create({
        textFont: {
            fontFamily: 'Montserrat-Regular',
        },

        row: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        column: {
            flexDirection: 'column',
        },
        mr12: {
            marginRight: 12,
        },
        mt12: {
            marginTop: 12,
        },
        mt10: {
            marginTop: 10,
        },
        mr4: {
            marginRight: 4,
        },
        mb12: {
            marginBottom: 12,
        },
        upperCase: {
            textTransform: 'uppercase',
        },
        borderRound: {
            borderWidth: 1,
            borderRadius: 100,
        },
        whiteBackgroundContainer: {
            backgroundColor: colors.WHITE,
            flex: 1,
        },
        bold: {
            fontWeight: 'bold',
        },
        fill: {
            flex: 1,
        },
        capitalize: {
            textTransform: 'capitalize',
        },
        positiveText: {
            color: colors.MATERIAL_GREEN,
            fontFamily: font,
        },
        negativeText: {
            color: colors.MATERIAL_RED,
            fontFamily: font,
        },
        centerAlignedText: {
            textAlign: 'center',
        },
        centerAligned: {
            justifyContent: 'center',
            alignItems: 'center',
        },
        highlightedInfoText: {
            fontSize: 12,
            backgroundColor: colors.COLORPRIMARY,
            padding: 8,
            borderRadius: 2,
        },
        // use CustomCard when background is non-white else use this style
        card: {
            borderTopWidth: 1,
            borderRightWidth: 1,
            borderBottomWidth: 2,
            borderLeftWidth: 1,
            borderRadius: 5,
            padding: 12,
            backgroundColor: colors.WHITE,
        },
        underline: {
            textDecorationLine: 'underline',
        },
        horizontalScrollView: {
            marginVertical: 10,
            paddingHorizontal: 10,
        },

        marginHorizontal: {
            marginHorizontal: 10,
        },
        marginHorizontal15: {
            marginHorizontal: 15,
            marginTop: 10,
        },
        marginHorizontal20: {
            marginHorizontal: 20,
        },
        rightAligned: {
            justifyContent: 'flex-end',
        },

        inputText: {
            borderColor: '#b3b3b3',
            borderWidth: 1,
            borderRadius: 50,
            width: '100%',
            paddingHorizontal: 20,
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignSelf: 'center',
            height: 50,
        },
        inputArea: {
            borderColor: '#b3b3b3',
            borderWidth: 1,
            borderRadius: 15,
            width: '100%',
            paddingHorizontal: 20,
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignSelf: 'center',
            height: 150,
        },
        titleStyle: {
            fontSize: 15,
            fontFamily: 'Montserrat-Regular',
            fontWeight: '600',
            marginHorizontal: 15,
        },

        titleView: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
        },

        betweenTwoView: {
            marginTop: 10,
            marginBottom: 10,
        },
        card1WidthH: {
            width: windowWidth / 1 - 25,
            marginHorizontal: 5,
        },
        card1Width: {
            width: windowWidth / 1 - 25,
        },
        card2Width: {
            width: windowWidth / 2 - 15,
        },
        card3Width: {
            width: windowWidth / 3 - 15,
        },
        dashBoardCards: {
            shadowColor: 'black',
            shadowOpacity: 0.26,
            shadowOffset: { width: 0, height: 2 },
            shadowRadius: 8,
            elevation: 3,
            backgroundColor: 'white',
            borderRadius: 10,
            padding: 10,
            marginHorizontal: 5,
            backgroundColor: '#fff',
            alignSelf: 'center',
            marginBottom: 5,
        },

        cardPromo: {
            shadowColor: 'black',
            shadowOpacity: 0.26,
            shadowOffset: { width: 0, height: 2 },
            shadowRadius: 8,
            elevation: 3,
            backgroundColor: 'white',
            borderRadius: 10,
            paddingHorizontal: 10,
            marginHorizontal: 5,
            backgroundColor: '#fff',
            alignSelf: 'center',
            alignItems: 'center',
            marginBottom: 5,
        },

        imageIcon50: {
            height: 50,
            width: 50,
            borderRadius: 100,
        },

        imageIcon100: {
            height: 100,
            width: 100,
            borderRadius: 100,
        },

        imageIcon30: {
            height: 30,
            width: 30,
        },

        iconMed: {
            height: 35,
            width: 35,
        },

        icon20: {
            height: 20,
            width: 20,
        },

        flatListStyle: {
            paddingHorizontal: 10,
            paddingVertical: 10,
        },

        Screen: {
            flex: 1,
            backgroundColor: colors.BACKGROUND,
            height: '100%',
        },
        text12: {
            color: colors.BLACK,
            fontSize: 12,
            fontFamily: font,
        },
        text12White: {
            color: colors.WHITE,
            fontSize: 12,
            fontFamily: font,
        },
        text12Gray: {
            color: colors.GREYISH,
            fontSize: 12,
            fontFamily: font,
        },
        text12Blue: {
            color: colors.COLORPRIMARY,
            fontSize: 12,
            fontFamily: font,
        },
        text12Red: {
            color: colors.MATERIAL_RED,
            fontSize: 12,
            fontFamily: font,
        },
        text10: {
            color: colors.BLACK,
            fontSize: 10,
            fontFamily: font,
        },
        text10White: {
            color: colors.WHITE,
            fontSize: 10,
            fontFamily: font,
        },
        text10Gray: {
            color: colors.GREYISH,
            fontSize: 10,
            fontFamily: font,
        },
        text10Blue: {
            color: colors.COLORPRIMARY,
            fontSize: 10,
            fontFamily: font,
        },
        text10Red: {
            color: colors.MATERIAL_RED,
            fontSize: 10,
            fontFamily: font,
        },
        text15: {
            color: colors.BLACK,
            fontSize: 15,
            fontFamily: font,
        },
        text15White: {
            color: colors.WHITE,
            fontSize: 15,
            fontFamily: font,
        },
        text15Gray: {
            color: colors.GREYISH,
            fontSize: 15,
            fontFamily: font,
        },
        text15Blue: {
            color: colors.COLORPRIMARY,
            fontSize: 15,
            fontFamily: font,
        },
        text15Red: {
            color: colors.MATERIAL_RED,
            fontSize: 15,
            fontFamily: font,
        },
        roundBorderText: {
            // backgroundColor: '#f8c548',
            borderRadius: 20,
            paddingVertical: 3,
            paddingHorizontal: 5,
            height: 20,
        },
        //// houseHold
        houseHoldCard: {
            backgroundColor: '#fff',
            borderRadius: 10,
            margin: 5,
            alignSelf: 'center',
            paddingVertical: 10,
            alignItems: 'center',
            justifyContent: 'center',
        },
        houseHoldCardImage: {
            marginHorizontal: 20,
            alignSelf: 'center',
            height: 70,
            width: 70,
            borderRadius: 50,
        },
        houseHoldCardImage2: {
            marginHorizontal: 20,
            alignSelf: 'center',
            height: 70,
            width: 70,
            borderRadius: 50,
        },
        houseHoldCardText1: {
            alignSelf: 'center',
            marginTop: 5,
            fontFamily: font,
        },
        houseHoldCardText2: {
            alignSelf: 'center',
            color: 'gray',
            fontFamily: font,
        },
        houseHoldCardButtonView: {
            flexDirection: 'row',
            paddingHorizontal: 15,
            marginTop: 10,
            width: 150,
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        houseHoldCardButton: {
            borderColor: 'gray',
            borderWidth: 1,
            borderRadius: 100,
            padding: 2,
            shadowColor: 'black',
            shadowOpacity: 0.26,
            shadowOffset: { width: 0, height: 5 },
            shadowRadius: 100,
            elevation: 10,
            backgroundColor: 'white',
        },
        addText: {
            color: colors.COLORPRIMARY,
            fontWeight: 'bold',
            marginRight: 15,
            fontFamily: font,
        },

        /////complain
        textTitle: {
            fontFamily: font,
            fontSize: 18,
            textTransform: 'uppercase',
            color: 'black',
            fontWeight: '800',
        },
    });
}

export const commonStyles = commonStyles1;

export function elevationShadowStyle(elevation) {
    return {
        elevation,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 0.5 * elevation },
        shadowOpacity: 0.5,
        shadowRadius: 0.8 * elevation,
        borderWidth: 0.1,
    };
}
