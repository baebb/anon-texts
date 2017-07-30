import {
  CHECK_NUM_LOADING,
  CHECK_NUM_ERROR,
  CHECK_NUM_RECEIVED
} from '../actions/index';

const INIT_STATE = {
  numberCheckLoading: null,
  numberTypeStore: {},
  numberCheckError: false
};

export default function (state = INIT_STATE, action) {
  switch(action.type) {
    case CHECK_NUM_LOADING:
      return {
        ...state,
        numberCheckLoading: true
      };
    case CHECK_NUM_RECEIVED:
      return {
        ...state,
        numberCheckLoading: false,
        numberTypeStore: {
          ...state.numberTypeStore,
          [action.payload.number]: action.payload.type
        }
      };
    case CHECK_NUM_ERROR:
      return state;
    default:
      return state;
  }
}