import { CSSProperties, FunctionComponent } from "react";
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
    transition: "height 0.5s ease-out",
  })
);

interface Props {
  style?: CSSProperties;
}

const Navbar: FunctionComponent<Props> = ({ style = {} }) => {
  const isMobile = useMediaQuery();

  return (
    <Nav style={style}>
      {isMobile ? <MobileMenu iconHeight={style.height} /> : <DesktopMenu />}
    </Nav>
  );
};

export default Navbar;
