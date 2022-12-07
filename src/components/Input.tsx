import { FunctionComponent, ChangeEvent } from "react";
import styled from "@emotion/styled";

import { capitalize } from "../utils/general";
import { COLORS } from "../utils/constants";

const StyledInput = styled.input({
  width: "100%",
  fontSize: 16,
  padding: 10,
  paddingLeft: 0,
  backgroundColor: "initial",
  color: COLORS.WHITE,
  border: "none",
  borderBottomWidth: 2,
  borderBottomStyle: "solid",
  borderBottomColor: COLORS.WHITE,
  ":focus": {
    outline: "none",
    borderBottomColor: COLORS.RED,
  },
});

export interface Props {
  name: string;
  type: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  value: string | number;
}

const Input: FunctionComponent<Props> = ({ name, type, onChange, value }) => {
  return (
    <div style={{ margin: 16 }}>
      <StyledInput
        id={name}
        name={name}
        type={type}
        onChange={onChange}
        value={value}
        placeholder={capitalize(name)}
      />
    </div>
  );
};

export default Input;
