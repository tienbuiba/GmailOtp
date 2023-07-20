// scroll bar
import 'simplebar/src/simplebar.css';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from "react-redux";
import App from './App';
import store from './store/Store';
import BuyMailModal from './modal/BuyMailModal';
import './i18next/i18n'
// ----------------------------------------------------------------------

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}> 
  <HelmetProvider>
    <BrowserRouter>
      <App />
      <BuyMailModal />
    </BrowserRouter>
  </HelmetProvider>
  </Provider>

);


