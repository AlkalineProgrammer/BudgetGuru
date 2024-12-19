import {
    GET_CATEGORIES_FAILED,
    GET_CATEGORIES_RESET,
    GET_CATEGORIES_NETWORK_FAILED,
    GET_CATEGORIES_LOADING,
    GET_CATEGORIES_SUCCESS,
    State,
    getCategoriesActionTypes,
} from '../store/types'

const initialState: State = {
    isSuccess: false,
    isError: false,
    status: "",
    isLoading: false,
    data: {},
};

export default (state = initialState, action: getCategoriesActionTypes) => {
    switch (action.type) {
        case GET_CATEGORIES_SUCCESS:
            return {
                ...state,
                isSuccess: true,
                isError: false,
                isLoading: false,
                status: "GET CATEGORIES Sucessfully",
                data: action.payload,
            };

        case GET_CATEGORIES_FAILED:
            return {
                ...state,
                isError: true,
                isSuccess: false,
                isLoading: false,
                data: action.payload,
                status: "GET CATEGORIES Failed",
            };

        case GET_CATEGORIES_LOADING:
            return {
                ...state,
                isLoading: true,
                status: "GET CATEGORIES loading..."
            }

        case GET_CATEGORIES_NETWORK_FAILED:
            return {
                ...state,
                isSuccess: false,
                isError: true,
                status: "GET CATEGORIES Failed",
                data: action.payload,
            };

        case GET_CATEGORIES_RESET:
            return (
                state = initialState
            )

        default:
            return state;
    }
}