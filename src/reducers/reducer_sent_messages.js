import { SENT_MESSAGES_RECEIVED } from '../actions/index';

const INIT_STATE = { sentMessagesStore: {} };

export default function (state = INIT_STATE, action) {
  switch (action.type) {
    case SENT_MESSAGES_RECEIVED:
      return {
        ...state,
        sentMessagesStore: {
          ...state.sentMessagesStore,
          [action.payload.number]: action.payload.messages
        }
      };
    default:
      return state;
  }
}