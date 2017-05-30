import { SEND_LOADING, SEND_SUCCESS, SEND_ERROR } from '../actions/index';

const INIT_STATE = {
  smsSent: false,
  smsError: null,
  smsSending: false
};

export default function (state = INIT_STATE, action) {
  switch (action.type) {
    case SEND_SUCCESS:
      return { ...state, smsSent: true, smsError: null, smsSending: false };
    case SEND_ERROR :
      return { ...state, smsSent: false, smsError: action.payload.message, smsSending: false };
    case SEND_LOADING:
      return { ...state, smsSending: true };
    default:
      return state;
  }
}