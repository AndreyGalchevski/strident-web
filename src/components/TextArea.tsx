import { FunctionComponent, ChangeEvent } from "react";
import styled from "styled-components";

import { capitalize } from "../utils/general";

const StyledTextArea = styled.textarea(({ theme: { colors } }) => ({
  width: "100%",
  height: 350,
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
  resize: "none",
}));

export interface Props {
  name: string;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  value: string;
}

const TextArea: FunctionComponent<Props> = ({ name, onChange, value }) => {
  return (
    <div style={{ margin: 16 }}>
      <StyledTextArea
        id={name}
        onChange={onChange}
        value={value}
        placeholder={capitalize(name)}
      />
    </div>
  );
};

export default TextArea;
