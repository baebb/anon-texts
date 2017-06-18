import { combineReducers } from 'redux';

import sentMessagesReducer from './reducer_sent_messages';
import smsReducer from './reducer_sms';

const rootReducer = combineReducers({
  sentMessages: sentMessagesReducer,
  sms: smsReducer
});

export default rootReducer;
