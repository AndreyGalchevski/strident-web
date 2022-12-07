import { CSSProperties, FunctionComponent } from "react";

import theme from "../../utils/theme";

interface Props {
  width?: number;
  height?: number;
  color?: string;
  style?: CSSProperties;
}

const DeleteIcon: FunctionComponent<Props> = ({
  width = 24,
  height = 24,
  color = theme.colors.white,
  style = {},
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 24 24"
    style={style}
  >
    <path
      fill={color}
      d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"
    />
  </svg>
);

export default DeleteIcon;
