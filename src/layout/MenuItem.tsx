import { FunctionComponent, CSSProperties } from "react";
import { NavLink } from "react-router-dom";

import theme from "../utils/theme";

const baseLinkStyle: CSSProperties = {
  color: theme.colors.white,
  paddingTop: 8,
  paddingBottom: 8,
  display: "flex",
  alignItems: "center",
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
