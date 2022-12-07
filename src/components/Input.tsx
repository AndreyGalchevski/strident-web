import { FunctionComponent, ChangeEvent } from "react";
import styled from "styled-components";

import { capitalize } from "../utils/general";

const StyledInput = styled.input(({ theme: { colors } }) => ({
  width: "100%",
  fontSize: 16,
  padding: 10,
  paddingLeft: 0,
  backgroundColor: "initial",
  color: colors.white,
  border: "none",
  borderBottomWidth: 2,
  borderBottomStyle: "solid",
  borderBottomColor: colors.white,
  ":focus": {
    outline: "none",
    borderBottomColor: colors.red,
  },
}));

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
