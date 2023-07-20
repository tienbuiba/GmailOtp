import Router from './routes';
import Loading from './components/loading/Loading';
import RentMailModal from './modal/RentMailModal';
import NoticeModal from './modal/NoticeModal';
import { createTheme } from './utils/theme';
import { ThemeProvider } from '@emotion/react';


// ----------------------------------------------------------------------

const theme = createTheme();

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Loading/>
      <Router/>
      <NoticeModal/>
      <RentMailModal/>
    </ThemeProvider>
  );
}
