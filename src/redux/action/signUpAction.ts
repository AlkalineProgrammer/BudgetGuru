import auth from '@react-native-firebase/auth';
import { SIGNUP_FAILED, SIGNUP_RESET, SIGNUP_SUCCESS, SignUpActionTypes } from '../store/types';
import { Dispatch, UnknownAction } from 'redux';
import { Alert, Platform, ToastAndroid } from 'react-native';
import Toast from 'react-native-simple-toast'
import { Login } from './loginAction';

type SignUpRequest = {
    email: string
    password: string
}

const SignUp = ({ email, password }: SignUpRequest) => async (dispatch: Dispatch<any>): Promise<void> => {
    const { showWithGravityAndOffset, LONG, BOTTOM } = Platform.OS === 'ios' ? Toast : ToastAndroid
    try {
        const result = await auth().createUserWithEmailAndPassword(email, password)
        dispatch({
            type: SIGNUP_SUCCESS,
            payload: result,
        })
        const { user } = result
        await user.sendEmailVerification();
    } catch (error: any) {
        dispatch({
            type: SIGNUP_FAILED,
            payload: error,
        })
        if (error.code === 'auth/email-already-in-use') {
            showWithGravityAndOffset(
                "Email already exist, trying to login",
                LONG,
                BOTTOM,
                0,
                Platform.OS === 'ios' ? 0 : 50
            )
            dispatch(Login({ email: email, password: password }))
        } else {
            Alert.alert("Sign up Error", error.message)
        }
    }
}

function resetSignUp() {
    return {
        type: SIGNUP_RESET
    }
}

export {
    resetSignUp, SignUp
} 