import * as actionTypes from '../actions/Actions';

export const initialState = {
  data: {
    isOpen: false,
  },
};

// ==============================|| Otp REDUCER ||============================== //

const noticeReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SHOW_NOTICE_MODAL:
      return {
        ...state,
        data: {
          ...state.data,
          isOpen: true,

        }
      };
    case actionTypes.CLOSE_NOTICE_MODAL:
      return {
        ...state,
        data: {
          ...state.data,
          isOpen: false,
        }
      };
    default:
      return state;
  }
};

export default noticeReducer;
