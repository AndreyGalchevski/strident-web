import { observer } from "mobx-react-lite";
import styled from "styled-components";

import Hamburger from "../components/Hamburger";
import useSideMenu from "../hooks/useSideMenu";
import Logo from "./Logo";

const Wrapper = styled.div({
  display: "flex",
  height: "100%",
});

const LogoWrapper = styled.div({
  flex: 4,
});

const Divider = styled.div({
  flex: 1,
});

const MobileMenu = () => {
  const sideMenu = useSideMenu();

  const handleMenuClick = () => {
    sideMenu.toggle();
  };

  return (
    <Wrapper>
      <Hamburger onClick={handleMenuClick} style={{ flex: 1 }} />
      <LogoWrapper>
        <Logo />
      </LogoWrapper>
      <Divider />
    </Wrapper>
  );
};

export default observer(MobileMenu);
