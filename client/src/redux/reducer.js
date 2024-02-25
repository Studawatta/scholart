import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './user/userSlice';
import formReducer from './form/formSlice';

const rootReducer = combineReducers({
  user: userReducer,
  form: formReducer,
});

export default rootReducer;
