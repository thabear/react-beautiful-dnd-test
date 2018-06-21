import { combineReducers } from 'redux';
import dndReducer from './dndReducer';

export default combineReducers({
    stuff: dndReducer
});
