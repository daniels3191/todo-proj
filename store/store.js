const { createStore } = Redux


const initialState = {
    todos: null,
    isLoading: false,
    filterBy: {}
}

const INCREMENT = 'INCREMENT'
export const SET_TODOS = 'SET_TODOS'
export const SET_IS_LOADING = 'SET_IS_LOADING'
export const SET_FILTERBY = 'SET_FILTERBY'

function appReducer(state = initialState, cmd) {

    switch (cmd.type) {
        case INCREMENT:
            return { ...state, counter: state.counter + 1 }

        case SET_TODOS:
            return { ...state, todos: cmd.todos }

        case SET_IS_LOADING:
            return { ...state, isLoading: cmd.isLoading }

        case SET_FILTERBY:
            return { ...state, filterBy: cmd.filterBy }


        default:
            return state
    }

}

export const store = createStore(appReducer)
window.gstore = store