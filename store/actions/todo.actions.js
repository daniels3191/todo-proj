import { showErrorMsg } from "../../services/event-bus.service.js";
import { todoService } from "../../services/todo.service.js";
import { ADD_TODOS, SET_FILTERBY, REMOVE_TODOS, SET_IS_LOADING, SET_TODOS, store, UPDATE_TODOS } from "../store.js";



export function loadTodos(filterBy = {}) {
    store.dispatch({ type: SET_IS_LOADING, isLoading: true })

    return todoService.query(filterBy)
        .then(todos => store.dispatch({ type: SET_TODOS, todos }))
        .finally(() => store.dispatch({ type: SET_IS_LOADING, isLoading: true }))
        .catch(err => {
            console.log('err:', err)
            showErrorMsg('Cannot load todos')
        })
}

export function removeTodo(todoId) {
    store.dispatch({ type: SET_IS_LOADING, isLoading: true })

    return todoService.remove(todoId)
        .then(() => store.dispatch({ type: REMOVE_TODOS, todoId }))
        .finally(() => store.dispatch({ type: SET_IS_LOADING, isLoading: true }))


}

export function saveTodo(todo) {
    store.dispatch({ type: SET_IS_LOADING, isLoading: true })

    const type = todo._id ? UPDATE_TODOS : ADD_TODOS
    return todoService.save(todo)
        .then((todo) => store.dispatch({ type, todo }))
        .finally(() => store.dispatch({ type: SET_IS_LOADING, isLoading: true }))
}


export function setFilterBy(filterBy) {
    console.log(filterBy);

    store.dispatch({ type: SET_FILTERBY, filterBy })

}