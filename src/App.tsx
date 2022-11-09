import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import { BrowserRouter } from "react-router-dom";

import { AppContainer } from "./styles/app";
import { GlobalStyle } from './styles/global';

import { AppRoutes } from "./routes";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <GlobalStyle />
        <ToastContainer />
            <AppContainer>
              <AppRoutes />
            </AppContainer>
      </BrowserRouter>
    </>
  );
}

export default App;