import { FunctionComponent, useEffect, useState } from "react";
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
import useMediaQuery from "./hooks/useMediaQuery";
import useScrollDirection from "./hooks/useScrollDirection";

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
  const [hideNavigation, setHideNavigation] = useState(false);
  const isMobile = useMediaQuery();
  const scrollDirection = useScrollDirection();

  useEffect(() => {
    setHideNavigation(scrollDirection === "down" && isMobile);
  }, [scrollDirection, isMobile]);

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <ModalProvider>
            <AuthProvider>
              <SideMenuProvider>
                <Navbar style={hideNavigation ? { height: 0 } : {}} />
                <SideMenu pageWrapID={MAIN_APP_ID} />
                <Main id={MAIN_APP_ID}>
                  <Router />
                </Main>
                <Footer style={hideNavigation ? { height: 0 } : {}} />
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
