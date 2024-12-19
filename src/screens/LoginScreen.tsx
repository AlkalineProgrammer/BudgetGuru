import { Alert, Image, Platform, ScrollView, StatusBar, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { FC, useEffect, useState } from 'react'
import SafeScreen from '../components/common/SafeScreen'
import colors from '../constants/colors'
import { commonStyles } from '../constants/commonStyles'
import InputText from '../components/common/InputText'
import { Checkbox, Divider } from 'react-native-paper'
import FullButtonComponent from '../components/common/FullButtonComponent'
import LottieView from 'lottie-react-native'
import ErrorMessage from '../components/common/ErrorMessage'
import { useNavigation } from '@react-navigation/native'
import { resetSignUp, SignUp } from '../redux/action/signUpAction'
import { Login, resetLogin } from '../redux/action/loginAction'
import { FirebaseAuthTypes } from '@react-native-firebase/auth'
import Toast from 'react-native-simple-toast'
import { useDispatch, useSelector } from 'react-redux'
import { useTypedSelector } from '../hooks'
import { SignUpActionTypes } from '../redux/store/types'

const LoginScreen: FC = () => {
    const [registerToggle, setRegisterToggle] = useState<boolean>(false)
    let initialState = {
        email: "",
        password: '',
        phone: '',
        check_textInputChange: false,
        secureTextEntry: true,
        isValidUser: false,
        isValidPhone: false,
    }
    const [data, setData] = React.useState(initialState);
    const login = useTypedSelector((state) => state.login)
    const signup = useTypedSelector((state) => state.signUp)
    const navigation = useNavigation()
    const dispatch = useDispatch<any>()

    const inputDataSet = (title: string, value: string, isValidate: boolean) => {
        // if (title == 'Contact Number') {
        //     if (value.length < 10) {
        //         setData({
        //             ...data,
        //             phone: value,
        //             check_textInputChange: true,
        //             isValidPhone: false
        //         })
        //     } else {
        //         setData({
        //             ...data,
        //             phone: value,
        //             check_textInputChange: true,
        //             isValidPhone: isValidate
        //         })
        //     }
        // }
        if (title == 'Email') {
            if (value.length == 0) {
                setData({
                    ...data,
                    email: value,
                    check_textInputChange: true,
                    isValidUser: false
                })
            } else {
                setData({
                    ...data,
                    email: value,
                    check_textInputChange: true,
                    isValidUser: isValidate
                })
            }
        }
        if (title == 'Password') {
            if (value.length == 0) {
                setData({
                    ...data,
                    password: value,
                    check_textInputChange: true,
                    isValidUser: false
                })
            } else {
                setData({
                    ...data,
                    password: value,
                    check_textInputChange: true,
                    isValidUser: isValidate
                })
            }
        }
    };

    const handleLogin = () => {
        if (registerToggle) {
            dispatch(SignUp({ email: data.email, password: data.password }))
        } else {
            dispatch(Login({ email: data.email, password: data.password }))
        }

        return (() => {
            dispatch(resetSignUp())
            setData(initialState)
        })
    }

    return (
        <>
            <StatusBar backgroundColor={colors.BACKGROUND} barStyle={'dark-content'} />
            <SafeScreen style={styles.Screen}>
                <View style={{ alignItems: 'center', gap: 5 }}>
                    <View style={styles.headerStyle}>
                        <LottieView
                            source={require('../assets/Animation/SplashScreen_Lottie.json')}
                            style={{ width: 100, height: 100 }}
                            autoPlay
                        />
                        <Text style={commonStyles.textTitle}>Welcome to Budget Guru</Text>
                        <Text style={commonStyles.titleStyle}>Sign {registerToggle ? "up" : "in"} with your credentials</Text>
                    </View>
                    {/* {registerToggle &&
                        (<>
                            <Text style={commonStyles.text12}>Budget Guru will send OTP to verify the phone number.</Text>
                            <Divider style={{ borderWidth: StyleSheet.hairlineWidth, minWidth: "100%", marginTop: 5 }} />
                            <Text style={[commonStyles.text12, { padding: 10 }]}>Please  enter your 10 digit mobile number</Text>
                            <InputText
                                title='Contact Number'
                                type='tele'
                                limit={10}
                                style={{ maxHeight: 20 }}
                                getInputData={inputDataSet}
                                placeHolder='Enter Mobile Number'
                                keyboardType="default"
                                value=''
                                isMandatory={true}
                            />
                        </>
                        )} */}
                    <InputText
                        title='Email'
                        type='textInput'
                        getInputData={inputDataSet}
                        placeHolder='Enter Email'
                        keyboardType="default"
                        value=''
                        isMandatory={true}
                    />
                    {!data.isValidUser && <ErrorMessage message='Invalid Email' />}
                    <InputText
                        title='Password'
                        type='secure'
                        getInputData={inputDataSet}
                        placeHolder='Enter Password'
                        keyboardType='default'
                        value={data.password}
                        isMandatory={true}
                    />
                    {!registerToggle && <TouchableOpacity onPress={() => console.log("Pressed")}><Text style={styles.smText}>Forgot your Password?</Text></TouchableOpacity>}

                    <FullButtonComponent
                        disabled={!data.isValidUser}
                        extraStyle={{ marginTop: 10 }}
                        buttonColor={colors.COLORPRIMARY}
                        buttonText={registerToggle ? "Sign Up" : "Sign In"}
                        onPress={() => handleLogin()}
                    />
                </View>

                <View style={{ alignItems: 'center', width: "100%" }}>
                    <Text>{registerToggle ? "" : "Not"} Registered?</Text>
                    <TouchableOpacity activeOpacity={0.7} onPress={() => setRegisterToggle(!registerToggle)}>
                        <Text style={{ color: colors.COLORPRIMARY, textDecorationLine: 'underline' }}>{registerToggle ? "Login" : "Register"} Now.</Text>
                    </TouchableOpacity>
                </View>
            </SafeScreen >
        </>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    Screen: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: 20,
        gap: 30
    },
    headerStyle: {
        alignItems: 'center',
        padding: 10,
        gap: 10
    },
    smText: {
        fontSize: 12,
        color: colors.COLORPRIMARY,
        position: 'absolute',
        left: 55,
        top: -8

    },
    dropdownButtonStyle: {
        width: "100%",
        marginTop: 10,
        height: 50,
        borderWidth: 0.3,
        borderRadius: 12,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 12,
    },
    dropdownButtonTxtStyle: {
        flex: 1,
        fontSize: 18,
        fontWeight: '500',
        color: '#151E26',
    },
    dropdownButtonArrowStyle: {
        fontSize: 28,
    },
    dropdownButtonIconStyle: {
        fontSize: 28,
        marginRight: 8,
    },
    dropdownMenuStyle: {
        backgroundColor: '#E9ECEF',
        borderRadius: 8,
    },
    dropdownItemStyle: {
        width: '100%',
        flexDirection: 'row',
        paddingHorizontal: 12,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 8,
    },
    dropdownItemTxtStyle: {
        flex: 1,
        fontSize: 18,
        fontWeight: '500',
        color: '#151E26',
    },
    dropdownItemIconStyle: {
        fontSize: 28,
        marginRight: 8,
    },
})