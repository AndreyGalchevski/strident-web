import { CSSProperties, FunctionComponent } from "react";

import { COLORS } from "../../utils/constants";

interface Props {
  width?: number;
  height?: number;
  color?: string;
  style?: CSSProperties;
}

const EditIcon: FunctionComponent<Props> = ({
  width = 24,
  height = 24,
  color = COLORS.WHITE,
  style = {},
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 24 24"
    style={style}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path
        fill={color}
        d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a.996.996 0 000-1.41l-2.34-2.34a.996.996 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"
      />
    </svg>
  </svg>
);

export default EditIcon;
