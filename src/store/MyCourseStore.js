import { createStore, combineReducers, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import courseReducer from '../reducers/MyCourseReducer';
import apiMiddleware from '../middleware/MyCourseApi';
 
const rootReducer = combineReducers({
  course: courseReducer,
});
 
 
const store = createStore(
 
  rootReducer,
  applyMiddleware(thunk, apiMiddleware)
);
 
export default store;
 
