import {
  SENT_MESSAGES_RECEIVED,
  SENT_MESSAGES_ERROR,
  SENT_MESSAGES_EMPTY,
  SENT_MESSAGES_LOADING
} from '../actions/index';

const INIT_STATE = { sentMessagesStore: {}, sentMessagesIsLoading: null };

export default function (state = INIT_STATE, action) {
  switch (action.type) {
    case SENT_MESSAGES_RECEIVED:
      return {
        ...state,
        sentMessagesIsLoading: false,
        sentMessagesStore: {
          ...state.sentMessagesStore,
          [action.payload.number]: action.payload.messages
        }
      };
    case SENT_MESSAGES_LOADING:
      return {
        ...state,
        sentMessagesIsLoading: true
      };
    case SENT_MESSAGES_EMPTY:
      return {
        ...state,
        sentMessagesIsLoading: false,
        sentMessagesStore: {
          ...state.sentMessagesStore,
          [action.payload.number]: action.payload.messages
        }
      };
    case SENT_MESSAGES_ERROR:
      return state;
    default:
      return state;
  }
}