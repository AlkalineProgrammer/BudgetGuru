
import auth from '@react-native-firebase/auth';
import { LOGOUT_FAILED, LOGOUT_RESET, LOGOUT_SUCCESS } from '../store/types';
import { Dispatch } from 'redux';
import { Alert, BackHandler, Platform, ToastAndroid } from 'react-native';
import { navigate, navigationRef } from '../../utils/RefNavigation';
import Toast from 'react-native-simple-toast'
import AsyncStorage from '@react-native-async-storage/async-storage';
const { showWithGravityAndOffset, LONG, BOTTOM } = Platform.OS === 'ios' ? Toast : ToastAndroid

const Logout = () => async (dispatch: Dispatch) => {

    try {
        // Code that might throw an error
        const result = await auth().signOut()
        const keys = await AsyncStorage.getAllKeys()
        if (keys) await AsyncStorage.multiRemove(keys)
        dispatch(success(result))
        showWithGravityAndOffset(
            "Logged Out",
            LONG,
            BOTTOM,
            0,
            Platform.OS === 'ios' ? 0 : 50
        )
        navigationRef.current?.navigate('WelcomeScreen')
    } catch (error: any) {
        dispatch(failed(error))
    }
}

function success(data: any) {
    return {
        type: LOGOUT_SUCCESS,
        payload: data,
    }
}

function failed(data: any) {
    return {
        type: LOGOUT_FAILED,
        payload: data,
    }
}

function resetLogout() {
    return {
        type: LOGOUT_RESET
    }
}

export {
    resetLogout, Logout
} 