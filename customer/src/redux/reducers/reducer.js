import { combineReducers } from 'redux';
import balanceReducer from './balanceReducer';
import buyMailReducer from './BuyMailReducer';
import languageReducer from './languageReducer';
import loadingReducer from './LoadingReducer';
import noticeReducer from './NoticeModal';
import orderReducer from './OrderReducer';
import paymentReducer from './PaymentReducer';
import rentMailReducer from './RentMailReducer';

// ==============================|| COMBINE REDUCER ||============================== //

const Reducer = combineReducers({
    mail: buyMailReducer,
    loading: loadingReducer,
    order: orderReducer,
    payment: paymentReducer,
    balance: balanceReducer,
    language:  languageReducer,
    rent: rentMailReducer,
    notice:noticeReducer
});

export default Reducer;
