
import auth from '@react-native-firebase/auth';
import { LOGIN_FAILED, LOGIN_RESET, LOGIN_SUCCESS } from '../store/types';
import { Dispatch } from 'redux';
import { Alert } from 'react-native';
import { navigate } from '../../utils/RefNavigation';

type LoginRequest = {
    email: string
    password: string
}

const Login = ({ email, password }: LoginRequest) => async (dispatch: Dispatch) => {

    try {
        // Code that might throw an error
        const result = await auth().signInWithEmailAndPassword(email, password)

        if (!result.user.emailVerified) {
            // Show an alert or inform the user
            Alert.alert("Email not verified", "Please verify your email before logging in.", [{
                onPress: async () => await result.user.sendEmailVerification(),
                style: 'default',
                text: 'Verify'
            }]);
        } else {
            navigate({ name: "DashBoard" })
        }
        dispatch(success(result))
    } catch (error: any) {
        dispatch(failed(error))
    }
}

function success(data: any) {
    return {
        type: LOGIN_SUCCESS,
        payload: data,
    }
}

function failed(data: any) {
    return {
        type: LOGIN_FAILED,
        payload: data,
    }
}

function resetLogin() {
    return {
        type: LOGIN_RESET
    }
}

export {
    resetLogin, Login
} 