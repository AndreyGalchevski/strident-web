import { FunctionComponent, CSSProperties } from "react";
import { NavLink } from "react-router-dom";

import theme from "../utils/theme";

const baseLinkStyle = {
  color: theme.colors.white,
  margin: "auto",
};

interface MenuItemProps {
  path: string;
  text: string;
  onClick?: () => void;
  style?: CSSProperties;
}

const MenuItem: FunctionComponent<MenuItemProps> = ({
  path,
  text,
  onClick,
  style = {},
}) => (
  <NavLink
    to={path}
    style={({ isActive }) => ({
      ...baseLinkStyle,
      ...style,
      ...(isActive ? { fontSize: 16, color: theme.colors.red } : {}),
    })}
    onClick={onClick}
  >
    {text}
  </NavLink>
);

export default MenuItem;
