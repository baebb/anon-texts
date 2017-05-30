import { combineReducers } from 'redux';

import queryReducer from './reducer_queries';
import smsReducer from './reducer_sms';

const rootReducer = combineReducers({
  queries: queryReducer,
  sms: smsReducer
});

export default rootReducer;
