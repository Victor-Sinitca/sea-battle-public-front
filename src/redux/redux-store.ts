import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import thunkMiddleware from "redux-thunk";
import battleMapReducer, {watchSetShipsRandomSaga} from "./battleMap-reduсer";
import createSagaMiddleware from 'redux-saga'

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const rootReducers = combineReducers({
    battleMap:battleMapReducer,
});

type RootReducerType=typeof rootReducers
export type AppStateType= ReturnType<RootReducerType>

const sagaMiddleware = createSagaMiddleware()
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducers, composeEnhancers(
    applyMiddleware(sagaMiddleware,thunkMiddleware)
));


sagaMiddleware.run(watchSetShipsRandomSaga)

// @ts-ignore
window.store=store;


export default store;