import * as actionTypes from '../actions/Actions';

export const initialState = {
  data: {
    isOpenRentMail: false,
    id: null,
    name: null,
    price: null
  },
};

// ==============================|| rent REDUCER ||============================== //

const rentMailReducer = (state = initialState, action) => {
  switch (action.type) {
      case actionTypes.SHOW_RENT_MAIL_MODAL:
        return {
          ...state,
          data: {
            ...state.data,
            isOpenRentMail: true         
          }
        };      

        case actionTypes.ClOSE_RENT_MAIL_MODAL:
          return {
            ...state,
            data: {
              ...state.data,
              isOpenRentMail: false,
              id: null,
              name: null,
              price: null      
            }
          }; 
    default:
      return state;
  }
};

export default rentMailReducer;
