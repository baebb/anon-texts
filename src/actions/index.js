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

export function sendMessage(message) {
  return (dispatch) => {
    dispatch({ type: SEND_LOADING });
    const url = `${LAMBDA_ROOT_URL}dev/send`;
    const data = {
      to: '+61458080855',
      message: message
    };
    axios.post(url, data)
      .then((response) => {
        dispatch({ type: SEND_SUCCESS })
      })
      .catch((error) => {
        dispatch(sendError({ type: 'error', message: error }))
      });
  }
  // return {
  //   type: SEND_MSG,
  //   payload: request
  // }
}

export function navigateQuery(string) {
  return (dispatch) => {
    dispatch(
      push({
        pathname: `/query`,
        query: {
          string: string,
        },
      })
    )
  }
}

// export function storeQuery(query) {
//   return {
//     type: STORE_QUERY,
//     payload: query
//   }
// }