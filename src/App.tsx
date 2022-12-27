import { FunctionComponent } from "react";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import styled, { ThemeProvider } from "styled-components";

import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";
import { AuthProvider } from "./context/AuthContext";
import theme from "./utils/theme";
import { ModalProvider } from "./context/ModalContext";
import SystemModal from "./components/SystemModal";
import Router from "./Router";
import { SideMenuProvider } from "./context/SideMenuContext";
import SideMenu from "./layout/SideMenu";
import { MAIN_APP_ID } from "./utils/constants";

const Main = styled.main(
  ({
    theme: {
      globals: { navbarHeight },
    },
  }) => ({
    marginTop: `calc(${navbarHeight} + 3vh)`,
  })
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: Infinity,
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

const App: FunctionComponent = () => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <ModalProvider>
            <AuthProvider>
              <SideMenuProvider>
                <Navbar />
                <SideMenu pageWrapID={MAIN_APP_ID} />
                <Main id={MAIN_APP_ID}>
                  <Router />
                </Main>
                <Footer />
                <SystemModal />
              </SideMenuProvider>
            </AuthProvider>
          </ModalProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
