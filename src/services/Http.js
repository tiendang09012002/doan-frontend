import axios from "axios";
//import {jwtDecode} from "jwt-decode";
import { BASE_API } from "../shared/constants/app";
//import {store} from "../redux-setup/store";
//import { loggedOut } from "../redux-setup/reducers/auth";
const Http = axios.create({
    baseURL: BASE_API,
});
// Http.interceptors.request.use(function (config) {
//     // Do something before request is sent
//     const token = store.getState().Auth.login.currentCustomer?.customer?.accsessToken
//     if(token) {
//         const decoded = jwtDecode(token)
//         if(decoded.exp * 1000 < Date.now()){
//             store.dispatch(loggedOut())
//         }
//     }
//     config.headers["token"] = `Bearer ${token}`
//     return config;
// }, function (error) {
//     // Do something with request error
//     return Promise.reject(error);
// });
export default Http;