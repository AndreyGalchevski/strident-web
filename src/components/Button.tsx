import { PropsWithChildren, FunctionComponent, MouseEventHandler } from "react";
import styled from "styled-components";

const StyledButton = styled.button<{ isPrimary: boolean }>(
  ({ theme: { colors }, isPrimary }) => ({
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
    backgroundColor: isPrimary ? colors.red : colors.grey,
    color: colors.white,
  })
);

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
