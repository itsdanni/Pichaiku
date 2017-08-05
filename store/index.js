
import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import image from './image';
import labels from './labels';

const rootReducer = combineReducers({
  image,
  labels,
});

const middleware = applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
const store = createStore(rootReducer, middleware);

export default store;

export * from './image';
export * from './labels';
