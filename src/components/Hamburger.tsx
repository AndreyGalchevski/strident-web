import { FunctionComponent, CSSProperties } from "react";
import styled from "styled-components";

import MenuIcon from "./icons/Menu";

const Wrapper = styled.a({
  height: 56,
  width: 46,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

interface Props {
  onClick: () => void;
  style?: CSSProperties;
}

const Hamburger: FunctionComponent<Props> = ({ onClick, style = {} }) => (
  <Wrapper onClick={onClick} style={style}>
    <MenuIcon height={style.height} />
  </Wrapper>
);

export default Hamburger;
