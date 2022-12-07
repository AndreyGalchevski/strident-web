import { FunctionComponent, ChangeEvent } from "react";
import styled from "@emotion/styled";

import { capitalize } from "../utils/general";
import { COLORS } from "../utils/constants";

const StyledTextArea = styled.textarea({
  width: "100%",
  height: 350,
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
  resize: "none",
});

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
