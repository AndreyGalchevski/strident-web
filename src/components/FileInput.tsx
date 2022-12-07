import { FunctionComponent, ChangeEvent, useState } from "react";
import styled from "styled-components";

import { COLORS } from "../utils/constants";

const Wrapper = styled.div({
  display: "flex",
  flexDirection: "column",
  paddingTop: 8,
});

const InputContainer = styled.label({});

const InputButton = styled.p({
  padding: 8,
  backgroundColor: COLORS.RED,
  color: COLORS.WHITE,
});

export interface Props {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const FileInput: FunctionComponent<Props> = ({ onChange }) => {
  const [fileName, setFileName] = useState("");

  function handleChange(event: ChangeEvent<HTMLInputElement>): void {
    if (event.target.files && event.target.files.length > 0) {
      setFileName(event.target.files[0].name);
    }
    onChange(event);
  }

  return (
    <Wrapper>
      <InputContainer>
        <InputButton>File</InputButton>
        <input
          type="file"
          onChange={handleChange}
          style={{ display: "none" }}
        />
      </InputContainer>
      <p style={{ margin: 0 }}>{fileName}</p>
    </Wrapper>
  );
};

export default FileInput;
