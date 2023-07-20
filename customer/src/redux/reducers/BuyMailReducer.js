import * as actionTypes from '../actions/Actions';

export const initialState = {
  data: {
    isOpen: false,
    isOpenRentMail: false,
    id: null,
    name: null,
    price: null

  },
};

// ==============================|| Otp REDUCER ||============================== //

const buyMailReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SHOW_BUY_MAIL_MODAL:
      return {
        ...state,
        data: {
          ...state.data,
          isOpen: true,
          id: action.id,
          name: action.name,
          price: action.price
        }
      };
    case actionTypes.CLOSE_BUY_MAIL_MODAL:
      return {
        ...state,
        data: {
          ...state.data,
          isOpen: false,
          // isOpenRentMail: false,
          // id: null,
          // name: null,
          // price: null
        }
      };
    default:
      return state;
  }
};

export default buyMailReducer;
