import { CSSProperties, FunctionComponent } from "react";

import theme from "../../utils/theme";

interface Props {
  width?: number;
  height?: number;
  color?: string;
  style?: CSSProperties;
}

const AddIcon: FunctionComponent<Props> = ({
  width = 24,
  height = 24,
  color = theme.colors.white,
  style = {},
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    viewBox="0 0 48 48"
    style={style}
  >
    <path fill={color} d="M38 26H26v12h-4V26H10v-4h12V10h4v12h12v4z" />
  </svg>
);

export default AddIcon;
