import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import SafeScreen from '../components/common/SafeScreen'
import ArrowHeader from '../components/common/ArrowHeader'
import { useNavigation } from '@react-navigation/native'
import { OtpInput } from "react-native-otp-entry";
import { useTypedSelector } from '../hooks'
import { useSelector } from 'react-redux'
import colors from '../constants/colors'
import { commonStyles } from '../constants/commonStyles'

const Verification = () => {
    const navigation = useNavigation()
    const { data, status } = useTypedSelector(({ login }) => login)
    const [countDown, setCountDown] = React.useState(0);
    const [runTimer, setRunTimer] = React.useState(true);

    React.useEffect(() => {
        let timerId: any;

        if (runTimer) {
            setCountDown(60 * 5);
            timerId = setInterval(() => {
                setCountDown((countDown) => countDown - 1);
            }, 1000);
        } else {
            clearInterval(timerId);
        }

        return () => clearInterval(timerId);
    }, [runTimer]);

    React.useEffect(() => {
        if (countDown < 0 && runTimer) {
            console.log("expired");
            setRunTimer(false);
            setCountDown(0);
        }
    }, [countDown, runTimer]);

    const seconds = String(countDown % 60).padStart(2, '0');
    const minutes = String(Math.floor(countDown / 60)).padStart(2, '0');

    useEffect(() => {

    }, [])

    return (
        <SafeScreen>
            <ArrowHeader
                onPress={() => navigation.goBack()}
                side='left'
                title='Verification'
            />
            <View style={{ flex: 1, justifyContent: 'center', gap: 5 }}>
                <Text style={styles.bigTitle}>
                    Enter your {'\n'}Verification Code
                </Text>
                <OtpInput
                    numberOfDigits={6}
                    focusColor="#1488CC"
                    autoFocus={false}
                    hideStick={true}
                    placeholder="******"
                    blurOnFilled={true}
                    disabled={false}
                    type="numeric"
                    secureTextEntry={false}
                    focusStickBlinkingDuration={500}
                    onFocus={() => console.log("Focused")}
                    onBlur={() => console.log("Blurred")}
                    onTextChange={(text) => console.log(text)}
                    onFilled={(text) => console.log(`OTP is ${text}`)}
                    textInputProps={{
                        accessibilityLabel: "One-Time Password",
                    }}
                    theme={{
                        containerStyle: styles.otpContainer,
                        // pinCodeContainerStyle: styles.pinCodeContainer,
                        // pinCodeTextStyle: styles.pinCodeText,
                        // focusStickStyle: styles.focusStick,
                        // focusedPinCodeContainerStyle: styles.activePinCodeContainer,
                        // placeholderTextStyle: styles.placeholderText,
                        // filledPinCodeContainerStyle: styles.filledPinCodeContainer,
                        // disabledPinCodeContainerStyle: styles.disabledPinCodeContainer,
                    }}
                />
                <Text style={[styles.hightlightText, { fontSize: 20, marginHorizontal: 10 }]}>{minutes}:{seconds}</Text>
                <Text style={[commonStyles.text18, { padding: 8 }]}>
                    We send verification code to your email <Text style={styles.hightlightText}>brajaoma*****@gmail.com</Text> You can check your inbox.
                </Text>

            </View>
        </SafeScreen>
    )
}

export default Verification

const styles = StyleSheet.create({
    bigTitle: {
        fontSize: 36,
        marginHorizontal: 10,

    },
    otpContainer: {
        width: "80%",
        marginHorizontal: 10,
        padding: 5
    },
    hightlightText: {
        textDecorationLine: 'underline',
        color: colors.COLORPRIMARY
    }
})