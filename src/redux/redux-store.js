import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware from "redux-thunk";
import battleMapReducer from "./battleMap-reduсer";
import {reducer as formReducer} from "redux-form"


let reducers = combineReducers({
    battleMap:battleMapReducer,
    form: formReducer
});

let store= createStore(reducers, applyMiddleware(thunkMiddleware));
window.store=store;
export default store;