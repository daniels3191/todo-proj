import { showErrorMsg } from "../../services/event-bus.service.js";
import { todoService } from "../../services/todo.service.js";
import { ADD_TODOS, SET_FILTERBY, REMOVE_TODOS, SET_IS_LOADING, SET_TODOS, store, UPDATE_TODOS } from "../store.js";



export function loadTodos() {
    store.dispatch({ type: SET_IS_LOADING, isLoading: true })

    return todoService.query()
        .then(todos => store.dispatch({ type: SET_TODOS, todos }))
        .catch(err => {
            console.log('err:', err)
            showErrorMsg('Cannot load todos')
        })
        .finally(() => store.dispatch({ type: SET_IS_LOADING, isLoading: false }))
}

export function removeTodo(todoId) {
    store.dispatch({ type: SET_IS_LOADING, isLoading: true })

    return todoService.remove(todoId)
        .then(() => store.dispatch({ type: REMOVE_TODOS, todoId }))
        .finally(() => store.dispatch({ type: SET_IS_LOADING, isLoading: false }))
}

export function saveTodo(todo) {
    store.dispatch({ type: SET_IS_LOADING, isLoading: true })

    const type = todo._id ? UPDATE_TODOS : ADD_TODOS
    return todoService.save(todo)
        .then((todo) => store.dispatch({ type, todo }))
        .finally(() => store.dispatch({ type: SET_IS_LOADING, isLoading: false }))
}


export function setFilterBy(filterBy) {
    store.dispatch({ type: SET_FILTERBY, filterBy })
}


export function getFilteredTodos(state) {
    var todos = [...state.todos]
    const filterBy = state.filterBy

    if (filterBy.txt) {
        const regExp = new RegExp(filterBy.txt, 'i')
        todos = todos.filter(todo => regExp.test(todo.txt))
    }
    if (filterBy.importance) {
        todos = todos.filter(todo => todo.importance >= filterBy.importance)
    }
    return todos
}