import { combineReducers } from 'redux';
import AuthenticationReducer from './reducers/AuthenticationReducer';

export default combineReducers({
  authentication: AuthenticationReducer
});
