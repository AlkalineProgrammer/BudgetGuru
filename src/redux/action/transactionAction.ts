import { AxiosError } from 'axios';
import { Dispatch } from 'redux';
import {
    GET_TRANSACTION_SUCCESS,
    GET_TRANSACTION_FAILED,
    GET_TRANSACTION_LOADING,
    GET_TRANSACTION_NETWORK_FAILED,
    ADD_TRANSACTION_FAILED,
    ADD_TRANSACTION_NETWORK_FAILED,
    ADD_TRANSACTION_SUCCESS,
    ADD_TRANSACTION_RESET,
    ADD_TRANSACTION_LOADING,
} from '../store/types';
import { Platform, ToastAndroid } from 'react-native'
import axios from '../store/axios';
import { Transaction } from '../../../types';
import Toast from 'react-native-simple-toast'
const { showWithGravityAndOffset, LONG, BOTTOM } = Platform.OS === 'ios' ? Toast : ToastAndroid
// Define the type for the dispatch function to use the correct action types
export const getTransaction = (params?: string) => async (dispatch: Dispatch<any>) => {

    dispatch({ type: GET_TRANSACTION_LOADING }); // Dispatch loading action to update the UI

    try {
        const response = await axios.get(`/transaction${params}`);

        // On success, dispatch the login success action
        dispatch({
            type: GET_TRANSACTION_SUCCESS,
            payload: response.data, // Adjust the payload type as needed
        });
        return response.data
    } catch (error) {
        const axiosError = error as AxiosError;
        // If it's a network-related error, dispatch GET_TRANSACTION_NETWORK_FAILED
        if (!axiosError.response) {
            dispatch({
                type: GET_TRANSACTION_NETWORK_FAILED,
                payload: 'Network error, please check your internet connection.',
            });
        } else {
            // If there's a response but it's an error, dispatch GET_TRANSACTION_FAILED
            dispatch({
                type: GET_TRANSACTION_FAILED,
                payload: axiosError.response || 'Something went wrong during transaction.',
            });
        }
    }
};

export const insertTransaction = (transaction: Transaction) => async (dispatch: Dispatch<any>) => {
    dispatch({ type: ADD_TRANSACTION_LOADING })
    try {
        // Convert the date to a Unix timestamp in milliseconds
        const timestamp = new Date(transaction.date).getTime(); // Returns milliseconds

        // Send a POST request to add a new transaction
        const response = await axios.post(`/transaction`, {
            category_id: transaction.category_id,
            amount: transaction.amount,
            date: timestamp,  // Send the timestamp in milliseconds
            note: transaction.note,
            type: transaction.type,
            id: transaction.id
        })
        dispatch({
            type: ADD_TRANSACTION_SUCCESS,
            payload: response.data, // Adjust the payload type as needed
        });

        showWithGravityAndOffset(
            "Transaction Added Successfully",
            LONG,
            BOTTOM,
            0,
            Platform.OS === 'ios' ? 0 : 50
        )

    } catch (error) {
        const axiosError = error as AxiosError;
        // If it's a network-related error, dispatch ADD_TRANSACTION_NETWORK_FAILED
        if (!axiosError.response) {
            dispatch({
                type: ADD_TRANSACTION_NETWORK_FAILED,
                payload: 'Network error, please check your internet connection.',
            });
        } else {
            // If there's a response but it's an error, dispatch ADD_TRANSACTION_FAILED
            dispatch({
                type: ADD_TRANSACTION_FAILED,
                payload: axiosError.response || 'Something went wrong during transaction.',
            });
        }
    }
}

export const resetAddTransaction = () => {
    return {
        type: ADD_TRANSACTION_RESET
    }
}

// export const deleteTransaction = (id: number) => async (dispatch: Dispatch<any>) => {
//     dispatch({ type: GET_TRANSACTION_LOADING }); // Dispatch loading action to update the UI

//     try {
//         const response = await axios.get(`/transaction${params}`);
//         // On success, dispatch the login success action
//         dispatch({
//             type: GET_TRANSACTION_SUCCESS,
//             payload: response.data, // Adjust the payload type as needed
//         });
//         return response.data
//     } catch (error) {
//         const axiosError = error as AxiosError;
//         // If it's a network-related error, dispatch GET_TRANSACTION_NETWORK_FAILED
//         if (!axiosError.response) {
//             dispatch({
//                 type: GET_TRANSACTION_NETWORK_FAILED,
//                 payload: 'Network error, please check your internet connection.',
//             });
//         } else {
//             // If there's a response but it's an error, dispatch GET_TRANSACTION_FAILED
//             dispatch({
//                 type: GET_TRANSACTION_FAILED,
//                 payload: axiosError.response || 'Something went wrong during transaction.',
//             });
//         }
//     }
// }
