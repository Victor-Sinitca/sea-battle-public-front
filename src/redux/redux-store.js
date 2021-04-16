import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware from "redux-thunk";
import battleMapReducer, {watchSetShipsRandomSaga} from "./battleMap-reduсer";
import {reducer as formReducer} from "redux-form"
import createSagaMiddleware from 'redux-saga'



let reducers = combineReducers({
    battleMap:battleMapReducer,
    form: formReducer
});

const sagaMiddleware = createSagaMiddleware()
let store= createStore(reducers, applyMiddleware(sagaMiddleware,thunkMiddleware));

sagaMiddleware.run(watchSetShipsRandomSaga)

window.store=store;





export default store;