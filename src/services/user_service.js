import { LOGIN_URL, myAxios, REGISTER_URL } from "./helper";

export const signUp = (user) => {
    return myAxios
    .post(REGISTER_URL, user)
    .then((response) => response.data)
}

export const login = (loginDetails) => {
    return myAxios
    .post(LOGIN_URL, loginDetails)
    .then(response => response.data)
}