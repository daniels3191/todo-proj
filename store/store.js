import { todoService } from "../services/todo.service.js"
import { userService } from "../services/user.service.js"

const { createStore } = Redux


const initialState = {
    todos: [],
    isLoading: false,
    filterBy: todoService.getDefaultFilter(),

    loggedinUser: userService.getLoggedinUser()
}


export const SET_TODOS = 'SET_TODOS'
export const REMOVE_TODOS = 'REMOVE_TODOS'
export const ADD_TODOS = 'ADD_TODOS'
export const UPDATE_TODOS = 'UPDATE_TODOS'


export const SET_IS_LOADING = 'SET_IS_LOADING'
export const SET_FILTERBY = 'SET_FILTERBY'

export const SET_USER = 'SET_USER'

function appReducer(state = initialState, cmd) {

    switch (cmd.type) {

        case SET_TODOS:
            return { ...state, todos: cmd.todos }

        case REMOVE_TODOS:
            var todos = state.todos.filter(todo => todo._id !== cmd.todoId)
            return { ...state, todos }

        case ADD_TODOS:
            var todos = [...state.todos, cmd.todo]
            return { ...state.todos, todos }

        case UPDATE_TODOS:
            var todos = state.todos.map(todo => todo.id === cmd.todoId? cmd.todo : todo)
            return { ...state, todos: cmd.todos }

        case SET_IS_LOADING:
            return { ...state, isLoading: cmd.isLoading }

        case SET_FILTERBY:
            return { ...state, filterBy: cmd.filterBy }

        case SET_USER:
            return { ...state, loggedinUser: cmd.loggedinUser }


        default:
            return state
    }

}

export const store = createStore(appReducer)
window.gstore = store