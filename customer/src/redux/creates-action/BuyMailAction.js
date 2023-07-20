import * as actionTypes from '../actions/Actions'

export const showBuyMailModal = (id,name,price) => ({ type: actionTypes.SHOW_BUY_MAIL_MODAL,id:id,name:name, price:price});
export const closeBuyMailModal = () => ({ type: actionTypes.CLOSE_BUY_MAIL_MODAL });
export const showRentMailModal = () => ({ type: actionTypes.SHOW_RENT_MAIL_MODAL});

