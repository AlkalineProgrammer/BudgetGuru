import {
    ADD_TRANSACTION_FAILED,
    ADD_TRANSACTION_RESET,
    ADD_TRANSACTION_NETWORK_FAILED,
    ADD_TRANSACTION_LOADING,
    ADD_TRANSACTION_SUCCESS,
    State,
    AddTransactionActionTypes,
} from '../store/types'

const initialState: State = {
    isSuccess: false,
    isError: false,
    status: "",
    isLoading: false,
    data: {},
};

export default (state = initialState, action: AddTransactionActionTypes) => {
    switch (action.type) {
        case ADD_TRANSACTION_SUCCESS:
            return {
                ...state,
                isSuccess: true,
                isError: false,
                isLoading: false,
                status: "ADD TRANSACTION Sucessfully",
                data: action.payload,
            };

        case ADD_TRANSACTION_FAILED:
            return {
                ...state,
                isError: true,
                isSuccess: false,
                isLoading: false,
                data: action.payload,
                status: "ADD TRANSACTION Failed",
            };

        case ADD_TRANSACTION_LOADING:
            return {
                ...state,
                isLoading: true,
                status: "ADD TRANSACTION loading..."
            }

        case ADD_TRANSACTION_NETWORK_FAILED:
            return {
                ...state,
                isSuccess: false,
                isError: true,
                status: "ADD TRANSACTION Failed",
                data: action.payload,
            };

        case ADD_TRANSACTION_RESET:
            return (
                state = initialState
            )

        default:
            return state;
    }
}