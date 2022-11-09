import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import { BrowserRouter } from "react-router-dom";

import { AppContainer } from "./styles/app";
import { GlobalStyle } from './styles/global';

import { AuthProvider } from './providers/AuthProvider';
import { ModalProvider } from './providers/ModalProvider';

import { AppRoutes } from "./routes";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <GlobalStyle />
        <ToastContainer />
        <ModalProvider>
          <AuthProvider>
            <AppContainer>
              <AppRoutes />
            </AppContainer>
          </AuthProvider>
        </ModalProvider>
      </BrowserRouter>
    </>
  );
}

export default App;