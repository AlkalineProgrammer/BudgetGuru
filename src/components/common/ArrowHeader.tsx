import React, { FC, useEffect, useState } from 'react';
import {
    StyleSheet,
    View,
    SafeAreaView,
    Text,
    StatusBar,
} from 'react-native';
import { IconButton } from 'react-native-paper';
type ArrowHeaderProp = {
    side: "left" | "right" | "none",
    color?: string,
    onPress: (() => void),
    title: string
}
const ArrowHeader: FC<ArrowHeaderProp> = ({
    side,
    color = "white",
    onPress,
    title
}) => {
    let size: number = 0;
    const iconHide = () => {
        if (side === "left") {
            size = 25
        } else {
            size = 0
        }
    }
    useEffect(() => {
        iconHide();
    }, [])

    return (
        <>
            <StatusBar backgroundColor={'#1488CC'} animated />
            <View style={styles.headerDB}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                    {side === "left" ? <View style={{ padding: 0 }}>
                        <IconButton
                            icon={"arrow-left"}
                            size={25}
                            iconColor={color}
                            onPress={onPress}
                        />
                    </View> : null}
                    <View style={styles.headerTitle}>
                        <Text style={styles.titleText}>{title}</Text>
                    </View>
                    {side === "right" ? <View style={{ flex: 0 }}>
                        <IconButton
                            icon={"power-standby"}
                            size={25}
                            onPress={onPress}
                            iconColor={color}
                        />
                    </View> : null}
                </View>
            </View >
        </>
    );
};

export default ArrowHeader

const styles = StyleSheet.create({
    headerDB: {
        width: '100%',
        flexDirection: 'row',
        height: 50,
        backgroundColor: '#1488CC',
        alignItems: 'center',
        justifyContent: 'space-between',

    },
    titleText: {
        color: 'white',
        fontFamily: 'Montserrat-Regular',
        padding: 0,
        fontWeight: 'bold',
        fontSize: 14
    },
    inputText: {
        borderColor: '#b3b3b3',
        borderWidth: 0,
        borderRadius: 0,
        width: '100%',
        paddingHorizontal: 0,
        height: 50,
    },
    headerTitle: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginHorizontal: 15,
        flex: 1
    },
    settingIcon: {
        width: 20,
        height: 20,
    }

});
