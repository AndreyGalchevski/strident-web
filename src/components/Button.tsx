import {
  PropsWithChildren,
  FunctionComponent,
  ButtonHTMLAttributes,
} from "react";
import styled from "styled-components";

const StyledButton = styled.button<{ isPrimary: boolean }>(
  ({ theme: { colors }, isPrimary }) => ({
    border: "none",
    borderRadius: 2,
    display: "inline-block",
    height: 40,
    padding: "0 16px",
    textTransform: "uppercase",
    verticalAlign: "middle",
    WebkitTapHighlightColor: "transparent",
    marginRight: "1em",
    marginLeft: "1em",
    backgroundColor: isPrimary ? colors.red : colors.grey,
    color: isPrimary ? colors.white : colors.black,
    transitionDuration: "0.4s",
    "&:hover": {
      color: isPrimary ? colors.black : colors.grey,
      backgroundColor: isPrimary ? colors.white : colors.darkGrey,
    },
    cursor: "pointer",
  })
);

export interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  isPrimary?: boolean;
  isLoading?: boolean;
  fullWidth?: boolean;
  icon?: JSX.Element;
}

const Button: FunctionComponent<PropsWithChildren<Props>> = ({
  isPrimary = true,
  isLoading = false,
  fullWidth = false,
  onClick,
  style,
  icon,
  children,
  ...rest
}) => {
  return (
    <StyledButton
      isPrimary={isPrimary}
      type="button"
      onClick={onClick}
      disabled={isLoading}
      style={{ ...style, ...(fullWidth ? { width: "100%" } : {}) }}
      {...rest}
    >
      {isLoading ? "Saving..." : children}
    </StyledButton>
  );
};

export default Button;
