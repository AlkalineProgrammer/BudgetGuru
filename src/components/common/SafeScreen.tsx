import React, { CSSProperties, FC, ReactNode } from 'react'
import { View, StyleSheet, SafeAreaView, StyleProp, ViewStyle } from 'react-native'
import colors from '../../constants/colors'

type SafeScreenProps = {
    children: ReactNode,
    style?: StyleProp<ViewStyle>
};


const SafeScreen: FC<SafeScreenProps> = ({ children, style }) => {
    return (
        <SafeAreaView style={[{ backgroundColor: colors.BACKGROUND, flex: 1 }, style]} >
            {children}
        </SafeAreaView>
    )
}

export default SafeScreen