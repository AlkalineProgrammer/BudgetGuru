import { AxiosError } from 'axios';
import { Dispatch } from 'redux';
import {
    GET_CATEGORIES_SUCCESS,
    GET_CATEGORIES_FAILED,
    GET_CATEGORIES_LOADING,
    GET_CATEGORIES_NETWORK_FAILED,
    getCategoriesActionTypes,
} from '../store/types';
import axios from '../store/axios';

// Define the type for the dispatch function to use the correct action types
export const getCategories = (params?: string) => async (dispatch: Dispatch<any>) => {
    dispatch({ type: GET_CATEGORIES_LOADING }); // Dispatch loading action to update the UI

    try {
        const response = await axios.get(`/categories${params}`);

        // On success, dispatch the login success action
        dispatch({
            type: GET_CATEGORIES_SUCCESS,
            payload: response.data, // Adjust the payload type as needed
        });
    } catch (error) {
        const axiosError = error as AxiosError;
        // If it's a network-related error, dispatch GET_CATEGORIES_NETWORK_FAILED
        if (!axiosError.response) {
            dispatch({
                type: GET_CATEGORIES_NETWORK_FAILED,
                payload: 'Network error, please check your internet connection.',
            });
        } else {
            // If there's a response but it's an error, dispatch GET_CATEGORIES_FAILED
            dispatch({
                type: GET_CATEGORIES_FAILED,
                payload: axiosError.response || 'Something went wrong during login.',
            });
        }
    }
};

export const updateCategory = (id: number, updatedCategory: any) => async (dispatch: Dispatch<any>) => {
    try {
        // Send a PATCH request to update the category with the specified id
        const response = await axios.patch(`/categories/${id}`, updatedCategory);

        // Optionally, refresh or handle the updated category
        console.log('Category updated:', response.data);

        // You can also refresh your data here, if necessary (e.g., call getData() or fetch categories)
        dispatch(getCategories(''))

    } catch (error) {
        console.error('Error updating category:', error);
    }
}
