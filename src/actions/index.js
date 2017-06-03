import { push } from 'redux-little-router';
import axios from 'axios';

export const
  SEND_MSG = 'SEND_MSG',
  SEND_LOADING = 'SEND_LOADING',
  SEND_ERROR = 'SEND_ERROR',
  SEND_SUCCESS = 'SEND_SUCCESS';

const LAMBDA_ROOT_URL = 'https://dgy8gll6v4.execute-api.us-east-1.amazonaws.com/';

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
  return (dispatch) => {
    dispatch({ type: SEND_LOADING });
    const url = `${LAMBDA_ROOT_URL}dev/send`;
    const data = {
      to: formattedNumber,
      message: formattedMessage
    };
    axios.post(url, data)
      .then((response) => {
        dispatch({ type: SEND_SUCCESS })
      })
      .catch((error) => {
        dispatch(sendError({ type: 'error', message: error }))
      });
  }
}
// export function storeQuery(query) {
//   return {
//     type: STORE_QUERY,
//     payload: query
//   }
// }