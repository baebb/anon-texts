import { push } from 'redux-little-router';
import axios from 'axios';

export const
  SEND_LOADING = 'SEND_LOADING',
  SEND_ERROR = 'SEND_ERROR',
  SEND_SUCCESS = 'SEND_SUCCESS',
  SEND_RESET = 'SEND_RESET',
  SENT_MESSAGES_LOADING = 'SENT_MESSAGES_LOADING',
  SENT_MESSAGES_ERROR = 'SENT_MESSAGES_ERROR',
  SENT_MESSAGES_EMPTY = 'SENT_MESSAGES_EMPTY',
  SENT_MESSAGES_RECEIVED = 'SENT_MESSAGES_RECEIVED',
  CHECK_NUM_LOADING = 'CHECK_NUM_LOADING',
  CHECK_NUM_ERROR = 'CHECK_NUM_ERROR',
  CHECK_NUM_RECEIVED = 'CHECK_NUM_RECEIVED';

const
  SMS_LAMBDA_URL = process.env.NODE_ENV === 'production' ?
    'https://nd2zxjm99d.execute-api.us-east-1.amazonaws.com/production/send'
    : 'https://j8ofs9zn42.execute-api.us-east-1.amazonaws.com/dev/send',
  SENT_MSGS_ROOT_URL = process.env.NODE_ENV === 'production' ?
    'https://i0ygrrinsd.execute-api.us-east-1.amazonaws.com/production/sentMessages'
    : 'https://becqd6a376.execute-api.us-east-1.amazonaws.com/dev/sentMessages',
  CHECK_NUM_ROOT_URL = process.env.NODE_ENV === 'production' ?
    'https://5guz53jgo0.execute-api.us-east-1.amazonaws.com/production/checknum'
    :'https://4kwcmmkub7.execute-api.us-east-1.amazonaws.com/dev/checknum';


export function navigateSend(number) {
  return (dispatch) => {
    dispatch(push(`/send/${number}`))
  }
}

export function sendError(props) {
  console.log(props.message);
  return {
    type: SEND_ERROR,
    payload: {
      message: props.message,
      type: props.type || null
    }
  }
}

export function sendMessage(number, numberCountry, message) {
  const data = {
    to: number,
    countryCode: numberCountry,
    message: message
  };
  return (dispatch) => {
    dispatch({ type: SEND_LOADING });
    axios.post(SMS_LAMBDA_URL, data)
      .then((response) => {
        dispatch({ type: SEND_SUCCESS });
        dispatch(getSentMessages(number, numberCountry));
      })
      .catch((error) => {
        dispatch(sendError({ type: 'error', message: error }))
      });
  }
}

export function resetSendSms() {
  return {
    type: SEND_RESET
  }
}

export function getSentMessages(number, countryCode) {
  const numberPrefix = {
    US: '+1',
    AU: '+61'
  };
  const formattedNumber = numberPrefix[countryCode] + number;
  const url = `${SENT_MSGS_ROOT_URL}/${formattedNumber}`;
  return (dispatch) => {
    dispatch({ type: SENT_MESSAGES_LOADING });
    axios.get(url)
      .then((response) => {
        response.data === '' ? dispatch({
          type: SENT_MESSAGES_EMPTY,
          payload: {
            number: number,
            messages: {}
          }
        }) :
          dispatch({
            type: SENT_MESSAGES_RECEIVED,
            payload: {
              number: number,
              messages: response.data.messages
            }
          })
      })
      .catch((error) => {
        dispatch({ type: SENT_MESSAGES_ERROR });
        console.log(error);
      })
  }
}

export function checkNumber(number) {
  const data = { number: number };
  return (dispatch) => {
    dispatch({ type: CHECK_NUM_LOADING });
    axios.post(CHECK_NUM_ROOT_URL, data)
      .then((response) => {
        dispatch({
          type: CHECK_NUM_RECEIVED,
          payload: {
            number: number,
            type: response.data.type,
            countryCode: response.data.countryCode
          }
        });
        dispatch(getSentMessages(number, response.data.countryCode))
      })
      .catch((error) => {
        console.log(error);
        dispatch({
          type: CHECK_NUM_ERROR,
          payload: error
        })
      })
  }
}