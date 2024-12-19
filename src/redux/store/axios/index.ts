import axios from "axios";
axios.defaults.headers.common["Accept"] = "application/json";
axios.defaults.headers.common["Content-Type"] = "application/json";

let baseURL = 'http://10.0.2.2:5000'

export const instance = axios.create({
    baseURL: baseURL
});

instance.interceptors.request.use(
    async (config: any) => {
        return Promise.resolve(config);
    },
    (error) => {
        return Promise.reject(error)
    }
)
instance.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    return Promise.reject(error);
});

export default instance;
