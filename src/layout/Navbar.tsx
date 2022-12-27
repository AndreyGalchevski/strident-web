import { FunctionComponent } from "react";
import styled from "styled-components";

import useMediaQuery from "../hooks/useMediaQuery";
import MobileMenu from "./MobileMenu";
import DesktopMenu from "./DesktopMenu";

const Nav = styled.nav(
  ({
    theme: {
      colors,
      globals: { navbarHeight },
    },
  }) => ({
    height: navbarHeight,
    backgroundColor: colors.black,
    position: "fixed",
    top: "0",
    width: "100%",
    zIndex: 99,
  })
);

const Navbar: FunctionComponent = () => {
  const isMobile = useMediaQuery();

  return <Nav>{isMobile ? <MobileMenu /> : <DesktopMenu />}</Nav>;
};

export default Navbar;
