import {
    LOGIN_FAILED,
    LOGIN_RESET,
    LOGIN_NETWORK_FAILED,
    LOGIN_LOADING,
    LOGIN_SUCCESS,
    LoginActionTypes,
    State,
} from '../store/types'

const initialState: State = {
    isSuccess: false,
    isError: false,
    status: "",
    isLoading: false,
    data: {},
};

export default (state = initialState, action: LoginActionTypes) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                isSuccess: true,
                isError: false,
                isLoading: false,
                status: "Login Sucessfully",
                data: action.payload,
            };

        case LOGIN_FAILED:
            return {
                ...state,
                isError: true,
                isSuccess: false,
                isLoading: false,
                data: action.payload,
                status: "Login Failed",
            };

        case LOGIN_LOADING:
            return {
                ...state,
                isLoading: true,
                status: "Login Guest..."
            }

        case LOGIN_NETWORK_FAILED:
            return {
                ...state,
                isSuccess: false,
                isError: true,
                status: "Login Failed",
                data: action.payload,
            };

        case LOGIN_RESET:
            return (
                state = initialState
            )

        default:
            return state;
    }
}