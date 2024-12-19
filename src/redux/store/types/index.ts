export interface State {
    isSuccess: boolean,
    isError: boolean,
    status: string,
    isLoading: boolean,
    data: any,
}


//LOGOUT TYPES
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAILED = "LOGOUT_FAILED";
export const LOGOUT_NETWORK_FAILED = "LOGOUT_NETWORK_FAILED";
export const LOGOUT_LOADING = "LOGOUT_LOADING"
export const LOGOUT_RESET = "LOGOUT_RESET";

export type LogoutActionTypes =
    | { type: typeof LOGOUT_RESET }
    | { type: typeof LOGOUT_SUCCESS; payload: any }
    | { type: typeof LOGOUT_FAILED; payload: any }
    | { type: typeof LOGOUT_LOADING }
    | { type: typeof LOGOUT_NETWORK_FAILED; payload: any }


//LOGIN TYPES
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILED = "LOGIN_FAILED";
export const LOGIN_NETWORK_FAILED = "LOGIN_NETWORK_FAILED";
export const LOGIN_LOADING = "LOGIN_LOADING"
export const LOGIN_RESET = "LOGIN_RESET";

export type LoginActionTypes =
    | { type: typeof LOGIN_RESET }
    | { type: typeof LOGIN_SUCCESS; payload: any }
    | { type: typeof LOGIN_FAILED; payload: any }
    | { type: typeof LOGIN_LOADING }
    | { type: typeof LOGIN_NETWORK_FAILED; payload: any }


//SIGN UP TYPES
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const SIGNUP_FAILED = "SIGNUP_FAILED";
export const SIGNUP_NETWORK_FAILED = "SIGNUP_NETWORK_FAILED";
export const SIGNUP_LOADING = "SIGNUP_LOADING"
export const SIGNUP_RESET = "SIGNUP_RESET";

export type SignUpActionTypes =
    | { type: typeof SIGNUP_RESET }
    | { type: typeof SIGNUP_SUCCESS; payload: any }
    | { type: typeof SIGNUP_FAILED; payload: any }
    | { type: typeof SIGNUP_LOADING }
    | { type: typeof SIGNUP_NETWORK_FAILED; payload: any }


//GET CATEGORIES
export const GET_CATEGORIES_SUCCESS = "GET_CATEGORIES_SUCCESS";
export const GET_CATEGORIES_FAILED = "GET_CATEGORIES_FAILED";
export const GET_CATEGORIES_NETWORK_FAILED = "GET_CATEGORIES_NETWORK_FAILED";
export const GET_CATEGORIES_LOADING = "GET_CATEGORIES_LOADING"
export const GET_CATEGORIES_RESET = "GET_CATEGORIES_RESET";


export type getCategoriesActionTypes =
    | { type: typeof GET_CATEGORIES_RESET }
    | { type: typeof GET_CATEGORIES_SUCCESS; payload: any }
    | { type: typeof GET_CATEGORIES_FAILED; payload: any }
    | { type: typeof GET_CATEGORIES_LOADING }
    | { type: typeof GET_CATEGORIES_NETWORK_FAILED; payload: any }


//GET TRANSACTION
export const GET_TRANSACTION_SUCCESS = "GET_TRANSACTION_SUCCESS";
export const GET_TRANSACTION_FAILED = "GET_TRANSACTION_FAILED";
export const GET_TRANSACTION_NETWORK_FAILED = "GET_TRANSACTION_NETWORK_FAILED";
export const GET_TRANSACTION_LOADING = "GET_TRANSACTION_LOADING"
export const GET_TRANSACTION_RESET = "GET_TRANSACTION_RESET";


export type getTransactionActionTypes =
    | { type: typeof GET_TRANSACTION_RESET }
    | { type: typeof GET_TRANSACTION_SUCCESS; payload: any }
    | { type: typeof GET_TRANSACTION_FAILED; payload: any }
    | { type: typeof GET_TRANSACTION_LOADING }
    | { type: typeof GET_TRANSACTION_NETWORK_FAILED; payload: any }

//ADD TRANSACTION
export const ADD_TRANSACTION_SUCCESS = "ADD_TRANSACTION_SUCCESS";
export const ADD_TRANSACTION_FAILED = "ADD_TRANSACTION_FAILED";
export const ADD_TRANSACTION_NETWORK_FAILED = "ADD_TRANSACTION_NETWORK_FAILED";
export const ADD_TRANSACTION_LOADING = "ADD_TRANSACTION_LOADING"
export const ADD_TRANSACTION_RESET = "ADD_TRANSACTION_RESET";


export type AddTransactionActionTypes =
    | { type: typeof ADD_TRANSACTION_RESET }
    | { type: typeof ADD_TRANSACTION_SUCCESS; payload: any }
    | { type: typeof ADD_TRANSACTION_FAILED; payload: any }
    | { type: typeof ADD_TRANSACTION_LOADING }
    | { type: typeof ADD_TRANSACTION_NETWORK_FAILED; payload: any }

//REFRESH_AUTH_TOKEN_COMPLETED"
export const REFRESH_AUTH_TOKEN_COMPLETED = "REFRESH_AUTH_TOKEN_COMPLETED"