import { useEffect } from 'react';
/* eslint-disable perfectionist/sort-imports */
import { ToastContainer } from 'react-toastify';
import { PrimeReactProvider } from 'primereact/api';

import { useScrollToTop } from 'src/hooks/use-scroll-to-top';

// import LoginPage from 'src/pages/login';
import ThemeProvider from 'src/theme';
import Router, { LoginRouter } from './routes/sections';
import useAuthStore, { testAuth } from './store/authStore';
import IsLoading from './components/is-loading';

import 'src/global.css';
import 'react-toastify/dist/ReactToastify.css';
import 'primereact/resources/themes/lara-light-cyan/theme.css';

// ----------------------------------------------------------------------

export default function App() {
  useScrollToTop();
  const { user, token } = useAuthStore();
  useEffect(() => {
    if (user && token) {
      testAuth();
    }
  }, []);
  return (
    <PrimeReactProvider>
      <ThemeProvider>
        <IsLoading />
        <ToastContainer />
        {user && token ? <Router /> : <LoginRouter />}
        {/* <Router /> */}
      </ThemeProvider>
    </PrimeReactProvider>
  );
}
