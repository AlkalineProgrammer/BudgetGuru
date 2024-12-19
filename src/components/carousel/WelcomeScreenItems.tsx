import {
    StyleSheet,
    Text,
    View,
    Image,
    useWindowDimensions,
    ImageURISource,
    ColorValue,
} from 'react-native';
import React, { FC, useEffect } from 'react';
import SafeScreen from '../common/SafeScreen';

type WelcomeScreenItemsProp = {
    item: {
        id: number
        image: ImageURISource,
        title: String,
        description: String,
        color: ColorValue,
    },
    sendColor: ((color: string) => void),
    index: number
}

const WelcomeScreenItems: FC<WelcomeScreenItemsProp> = ({ item, index, sendColor }) => {
    const { width, height } = useWindowDimensions();
    useEffect(() => {
        if (index == item.id) {
            sendColor(item.color.toString())
        }
    }, [item.id, index])

    return (
        <SafeScreen style={[styles.container, {
            width: width
        }]}>
            <View style={{ backgroundColor: item.color, height: height / 2 }} />
            <Image
                source={item.image}
                style={[styles.image, { width, height: height / 2, transform: [{ scale: 0.44 }] }]}
            />
            <View style={{ width, marginTop: "15%", marginBottom: "15%" }}>
                <Text style={[styles.title, { color: item.color }]}>{item.title}</Text>
                <Text style={[styles.description, { color: item.color }]}>{item.description}</Text>
            </View>
        </SafeScreen>
    );
};

export default WelcomeScreenItems;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        marginTop: 10,
        position: 'absolute',
        justifyContent: 'center',
        borderRadius: 30,
        resizeMode: 'contain',
        alignSelf: 'center',
    },
    title: {
        justifyContent: 'center',
        fontWeight: '800',
        fontSize: 28,
        marginBottom: 10,
        color: 'white',
        textAlign: 'center',
    },
    description: {
        justifyContent: 'center',
        fontWeight: '300',
        color: 'white',
        textAlign: 'center',
        paddingHorizontal: 64,
    },
});