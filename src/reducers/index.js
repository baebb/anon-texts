import { combineReducers } from 'redux';

import sentMessagesReducer from './reducer_sent_messages';
import smsReducer from './reducer_sms';
import checkNumberReducer from './reducer_check_number';

const rootReducer = combineReducers({
  numberType: checkNumberReducer,
  sentMessages: sentMessagesReducer,
  sms: smsReducer
});

export default rootReducer;
