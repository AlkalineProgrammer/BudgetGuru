import { ColorValue, StyleProp, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native'
import React, { FC } from 'react'
import colors from '../../constants/colors'
import { commonStyles } from '../../constants/commonStyles'
type FullButtonComponentProp = {
    onPress?: () => void,
    buttonColor?: ColorValue,
    textColor?: ColorValue,
    buttonText: string,
    extraStyle?: StyleProp<ViewStyle>,
    disabled?: boolean
}
const FullButtonComponent: FC<FullButtonComponentProp> = ({
    onPress,
    buttonColor = colors.COLORPRIMARY,
    textColor = colors.WHITE,
    buttonText,
    extraStyle,
    disabled
}) => {
    return (
        <TouchableOpacity disabled={disabled} style={[styles.buttonStyle, extraStyle, { backgroundColor: buttonColor }]}
            activeOpacity={0.7}
            onPress={onPress}>
            <Text style={[commonStyles.text15, { color: textColor, textAlign: 'center' }]}>{buttonText}</Text>
        </TouchableOpacity>
    )
}

export default FullButtonComponent

const styles = StyleSheet.create({
    buttonStyle: {
        minWidth: "100%",
        borderRadius: 30,
        height: 50,
        alignContent: 'center',
        alignSelf: 'center',
        justifyContent: 'center'
    }
})