
//login
export const doLogin = (data, next) => {
    localStorage.setItem("data", JSON.stringify(data))
    next()
}

//logout
export const doLogout = (next) => {
    localStorage.removeItem("data")
    next()
}

//get user data
export const getCurrentUserData = () => {
    return isLoggedIn() ? JSON.parse(localStorage.getItem("data")).user : undefined 
}

//check if logged in
export const isLoggedIn = () => {
    let data = localStorage.getItem("data")
    return data != undefined ? true : false
}
