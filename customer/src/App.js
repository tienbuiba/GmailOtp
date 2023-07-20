import Router from './routes';
import ThemeProvider from './theme';
import ScrollToTop from './components/ScrollToTop';
import { BaseOptionChartStyle } from './components/chart/BaseOptionChart';
import Loading from './components/loading/Loading';
import RentMailModal from './modal/RentMailModal';
import NoticeModal from './modal/NoticeModal';


// ----------------------------------------------------------------------


export default function App() {
  return (
    <ThemeProvider>
      <ScrollToTop/>
      <BaseOptionChartStyle/>
      <Loading/>
      <Router/>
      <NoticeModal/>
      <RentMailModal/>
    </ThemeProvider>
  );
}
