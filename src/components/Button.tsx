import { PropsWithChildren, FunctionComponent, MouseEventHandler } from "react";
import styled from "styled-components";

import { COLORS } from "../utils/constants";

const StyledButton = styled.button<{ isPrimary: boolean }>(({ isPrimary }) => ({
  border: "none",
  borderRadius: 2,
  display: "inline-block",
  height: 36,
  padding: "0 16px",
  textTransform: "uppercase",
  verticalAlign: "middle",
  WebkitTapHighlightColor: "transparent",
  marginRight: "1em",
  marginLeft: "1em",
  backgroundColor: isPrimary ? COLORS.RED : COLORS.GREY,
  color: COLORS.WHITE,
}));

export interface Props {
  isPrimary?: boolean;
  handleClick?: MouseEventHandler;
}

const Button: FunctionComponent<PropsWithChildren<Props>> = ({
  isPrimary,
  handleClick,
  children,
}) => {
  return (
    <StyledButton isPrimary={!!isPrimary} type="button" onClick={handleClick}>
      {children}
    </StyledButton>
  );
};

export default Button;
