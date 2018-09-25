import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import cards from '../reducers/cards.reducers';


const loggerMiddleware = createLogger();

const rootReducer = combineReducers({
    cards,
});

function configureStore() {
    let store = createStore(
        rootReducer,
        compose(
            applyMiddleware(thunkMiddleware, loggerMiddleware)
        )
    );
    return { store };
}

export default configureStore;