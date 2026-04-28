import { showErrorMsg } from "../../services/event-bus.service.js";
import { todoService } from "../../services/todo.service.js";
import { SET_IS_LOADING, SET_TODOS, store } from "../store.js";



export function loadTodos(filterBy = {}) {
    return todoService.query(filterBy)
        .then(todos => store.dispatch({ type: SET_TODOS, todos }))
        .catch(err => {
            console.log('err:', err)
            showErrorMsg('Cannot load todos')
        })

}

export function changeIsLoading(isLoading){
    console.log(`isLoading: ${isLoading}`);
    
    store.dispatch({ type: SET_IS_LOADING, isLoading })
}