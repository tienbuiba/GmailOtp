import * as actionTypes from '../actions/Actions'

export const linkPaypal = (link) => ({ type: actionTypes.PAYPAL,link});
export const closeLinkPaypal = () => ({ type: actionTypes.CLOSE_PAYPAL });



