import { push } from 'redux-little-router';
import axios from 'axios';

export const
  SEND_LOADING = 'SEND_LOADING',
  SEND_ERROR = 'SEND_ERROR',
  SEND_SUCCESS = 'SEND_SUCCESS',
  SENT_MESSAGES_LOADING = 'SENT_MESSAGES_LOADING',
  SENT_MESSAGES_ERROR = 'SENT_MESSAGES_ERROR',
  SENT_MESSAGES_EMPTY = 'SENT_MESSAGES_EMPTY',
  SENT_MESSAGES_RECEIVED = 'SENT_MESSAGES_RECEIVED',
  CHECK_NUM_LOADING = 'CHECK_NUM_LOADING',
  CHECK_NUM_ERROR = 'CHECK_NUM_ERROR',
  CHECK_NUM_RECEIVED = 'CHECK_NUM_RECEIVED';

const
  SMS_LAMBDA_ROOT_URL = 'https://sor59zy6f2.execute-api.us-east-1.amazonaws.com/',
  SENT_MSGS_ROOT_URL = 'https://becqd6a376.execute-api.us-east-1.amazonaws.com/',
  CHECK_NUM_ROOT_URL = 'https://gxddywvm69.execute-api.us-east-1.amazonaws.com/';


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

export function sendMessage(number, message) {
  const formattedNumber = `+1${number}`;
  // const formattedNumber = `+61${number.slice(1)}`; Australian numbers
  const data = {
    to: formattedNumber,
    message: message
  };
  const url = `${SMS_LAMBDA_ROOT_URL}dev/send`;
  return (dispatch) => {
    dispatch({ type: SEND_LOADING });
    axios.post(url, data)
      .then((response) => {
        dispatch({ type: SEND_SUCCESS })
      })
      .catch((error) => {
        dispatch(sendError({ type: 'error', message: error }))
      });
  }
}

export function getSentMessages(number) {
  const formattedNumber = `+1${number}`;
  // const formattedNumber = `61${number.slice(1)}`; Australian numbers
  const url = `${SENT_MSGS_ROOT_URL}dev/sentMessages/${formattedNumber}`;
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
  const formattedNumber = `+1${number}`;
  const data = { number: formattedNumber };
  const url = `${CHECK_NUM_ROOT_URL}dev/checknum`;
  return (dispatch) => {
    dispatch({ type: CHECK_NUM_LOADING });
    axios.post(url, data)
      .then((response) => {
        dispatch({
          type: CHECK_NUM_RECEIVED,
          payload: {
            number: number,
            type: response.data.type
          }
        })
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