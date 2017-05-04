import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import rootReducer from '$reducers';
import { inDevelopment } from './EnvHelpers';


// in the feature, if you need, apply some middlewares
let middlewares = [];

if (inDevelopment) {
  const loggerMiddleware = createLogger();
  middlewares = [
    ...middlewares,
    loggerMiddleware,
  ];
}

export default (data = {}) => createStore(rootReducer, data, applyMiddleware(...middlewares));
