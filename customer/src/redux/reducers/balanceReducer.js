import * as actionTypes from '../actions/Actions';

export const initialState = {
  data: {
    balance: '',
    update: false
  },
};

// ==============================|| Otp REDUCER ||============================== //

const balanceReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_BALANCE:
      return {
        ...state,
        data: {
          ...state.data,
          balance: action.balance,
        }
      };

    case actionTypes.UPDATE_BALANCE:
      return {
        ...state,
        data: {
          ...state.data,
          update: !state.data.update
        }
      };
    default:
      return state;
  }
};

export default balanceReducer;
