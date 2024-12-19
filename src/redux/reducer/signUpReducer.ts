import {
    SIGNUP_FAILED,
    SIGNUP_RESET,
    SIGNUP_NETWORK_FAILED,
    SIGNUP_LOADING,
    SIGNUP_SUCCESS,
    SignUpActionTypes,
    State,
} from '../store/types'

const initialState: State = {
    isSuccess: false,
    isError: false,
    status: "",
    isLoading: false,
    data: {},
};

export default (state = initialState, action: SignUpActionTypes) => {
    switch (action.type) {
        case SIGNUP_SUCCESS:
            return {
                ...state,
                isSuccess: true,
                isError: false,
                isLoading: false,
                status: "SIGNUP Sucessfully",
                data: action.payload,
            };

        case SIGNUP_FAILED:
            return {
                ...state,
                isError: true,
                isSuccess: false,
                isLoading: false,
                data: action.payload,
                status: "SIGNUP Failed",
            };

        case SIGNUP_LOADING:
            return {
                ...state,
                isLoading: true,
                status: "SIGNUP Guest..."
            }

        case SIGNUP_NETWORK_FAILED:
            return {
                ...state,
                isSuccess: false,
                isError: true,
                status: "SIGNUP Failed",
                data: action.payload,
            };

        case SIGNUP_RESET:
            return (
                state = initialState
            )

        default:
            return state;
    }
}