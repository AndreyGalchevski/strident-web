import { FunctionComponent } from "react";
import styled from "styled-components";

import useMediaQuery from "../hooks/useMediaQuery";
import MobileMenu from "./MobileMenu";
import DesktopMenu from "./DesktopMenu";
import SideMenu from "./SideMenu";

const Nav = styled.nav(({ theme: { colors } }) => ({
  backgroundColor: colors.black,
}));

const Navbar: FunctionComponent = () => {
  const isMobile = useMediaQuery();

  return (
    <>
      <Nav style={{ height: isMobile ? 56 : 64 }}>
        {isMobile ? <MobileMenu /> : <DesktopMenu />}
      </Nav>
      <SideMenu />
    </>
  );
};

export default Navbar;
