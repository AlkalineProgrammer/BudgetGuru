import {
    GET_TRANSACTION_FAILED,
    GET_TRANSACTION_RESET,
    GET_TRANSACTION_NETWORK_FAILED,
    GET_TRANSACTION_LOADING,
    GET_TRANSACTION_SUCCESS,
    State,
    getCategoriesActionTypes,
    getTransactionActionTypes,
} from '../store/types'

const initialState: State = {
    isSuccess: false,
    isError: false,
    status: "",
    isLoading: false,
    data: {},
};

export default (state = initialState, action: getTransactionActionTypes) => {
    switch (action.type) {
        case GET_TRANSACTION_SUCCESS:
            return {
                ...state,
                isSuccess: true,
                isError: false,
                isLoading: false,
                status: "GET TRANSACTION Sucessfully",
                data: action.payload,
            };

        case GET_TRANSACTION_FAILED:
            return {
                ...state,
                isError: true,
                isSuccess: false,
                isLoading: false,
                data: action.payload,
                status: "GET TRANSACTION Failed",
            };

        case GET_TRANSACTION_LOADING:
            return {
                ...state,
                isLoading: true,
                status: "GET TRANSACTION loading..."
            }

        case GET_TRANSACTION_NETWORK_FAILED:
            return {
                ...state,
                isSuccess: false,
                isError: true,
                status: "GET TRANSACTION Failed",
                data: action.payload,
            };

        case GET_TRANSACTION_RESET:
            return (
                state = initialState
            )

        default:
            return state;
    }
}