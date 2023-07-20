import * as actionTypes from '../actions/Actions'

export const getBalance = (balance) => ({ type: actionTypes.GET_BALANCE, balance: balance });
export const updateBalance = () => ({ type: actionTypes.UPDATE_BALANCE });



