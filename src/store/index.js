import React from 'react';
import {createStore,applyMiddleware} from 'redux';
import reducers from '../reducers/reducers.js';
import thunk from "redux-thunk";
import logger from 'redux-logger';

export const store = createStore(reducers,applyMiddleware(logger, thunk));