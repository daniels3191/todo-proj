import { showSuccessMsg, showErrorMsg } from "../../services/event-bus.service.js"
import { userService } from "../../services/user.service.js"
import { SET_USER, store } from "../store.js"


export const userActions = {
    login,
    signup,
    logout
}

function login(credentials) {
    userService.login(credentials)
        .then(loggedinUser => store.dispatch({ type: SET_USER, loggedinUser }))
        .then(() => { showSuccessMsg('Logged in successfully') })
        .catch((err) => { showErrorMsg('Oops try again') })
}

function signup(credentials) {
    userService.signup(credentials)
        .then(loggedinUser => store.dispatch({ type: SET_USER, loggedinUser }))
        .then(() => { showSuccessMsg('Signed in successfully') })
        .catch((err) => { showErrorMsg('Oops try again') })
}

function logout() {
    userService.logout()
        .then(() => store.dispatch({ type: SET_USER, loggedinUser: null }))
        .catch((err) => {
            showErrorMsg('OOPs try again')
        })
}