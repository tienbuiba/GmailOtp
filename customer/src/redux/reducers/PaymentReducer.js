import * as actionTypes from '../actions/Actions';

export const initialState = {
  data: {
    link: null

  },
};

// ==============================|| Otp REDUCER ||============================== //

const paymentReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PAYPAL:
      return {
        ...state,
        data: {
          ...state.data,
          link: action.link,
        }
      };

    case actionTypes.CLOSE_PAYPAL:
      return {
        ...state,
        data: {
          ...state.data,
          link: null
        }
      };
    default:
      return state;
  }
};

export default paymentReducer;
