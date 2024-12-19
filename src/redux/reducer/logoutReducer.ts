import {
    LOGOUT_FAILED,
    LOGOUT_RESET,
    LOGOUT_NETWORK_FAILED,
    LOGOUT_LOADING,
    LOGOUT_SUCCESS,
    LogoutActionTypes,
    State,
} from '../store/types'

const initialState: State = {
    isSuccess: false,
    isError: false,
    status: "",
    isLoading: false,
    data: {},
};

export default (state = initialState, action: LogoutActionTypes) => {
    switch (action.type) {
        case LOGOUT_SUCCESS:
            return {
                ...state,
                isSuccess: true,
                isError: false,
                isLoading: false,
                status: "Logout Sucessfully",
                data: action.payload,
            };

        case LOGOUT_FAILED:
            return {
                ...state,
                isError: true,
                isSuccess: false,
                isLoading: false,
                data: action.payload,
                status: "Logout Failed",
            };

        case LOGOUT_LOADING:
            return {
                ...state,
                isLoading: true,
                status: "Logout Guest..."
            }

        case LOGOUT_NETWORK_FAILED:
            return {
                ...state,
                isSuccess: false,
                isError: true,
                status: "Logout Failed",
                data: action.payload,
            };

        case LOGOUT_RESET:
            return (
                state = initialState
            )

        default:
            return state;
    }
}