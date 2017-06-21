import { push } from 'redux-little-router';
import axios from 'axios';

export const
  SEND_LOADING = 'SEND_LOADING',
  SEND_ERROR = 'SEND_ERROR',
  SEND_SUCCESS = 'SEND_SUCCESS',
  SENT_MESSAGES_LOADING = 'SENT_MESSAGES_LOADING',
  SENT_MESSAGES_ERROR = 'SENT_MESSAGES_ERROR',
  SENT_MESSAGES_EMPTY = 'SENT_MESSAGES_EMPTY',
  SENT_MESSAGES_RECEIVED = 'SENT_MESSAGES_RECEIVED';

const SMS_LAMBDA_ROOT_URL = 'https://dgy8gll6v4.execute-api.us-east-1.amazonaws.com/';
const DB_LAMBDA_ROOT_URL = 'https://becqd6a376.execute-api.us-east-1.amazonaws.com/';


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
  const formattedNumber = `+61${number.slice(1)}`;
  const formattedMessage = `${message}\n| anon-texts.com`;
  const data = {
    to: formattedNumber,
    message: formattedMessage
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
  const formattedNumber = `61${number.slice(1)}`;
  const url = `${DB_LAMBDA_ROOT_URL}dev/sentMessages/${formattedNumber}`;
  return (dispatch) => {
    dispatch({ type: SENT_MESSAGES_LOADING });
    axios.get(url)
      .then((response) => {
        response.data === '' ? dispatch({ type: SENT_MESSAGES_EMPTY }) :
          dispatch({
            type: SENT_MESSAGES_RECEIVED,
            payload: response.data
          })
      })
      .catch((error) => {
        dispatch({ type: SENT_MESSAGES_ERROR });
        console.log(error);
      })
  }
}