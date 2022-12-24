import { FunctionComponent, ChangeEvent, useState, useRef } from "react";
import styled from "styled-components";

import Button from "./Button";

const Wrapper = styled.div({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
});

export interface Props {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const FileInput: FunctionComponent<Props> = ({ onChange }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState("");

  function handleChange(event: ChangeEvent<HTMLInputElement>): void {
    if (event.target.files && event.target.files.length > 0) {
      setFileName(event.target.files[0].name);
    }
    onChange(event);
  }

  return (
    <Wrapper>
      <label style={{ marginBottom: 5 }}>
        <Button isPrimary={false} onClick={() => fileInputRef.current?.click()}>
          File
        </Button>
        <input
          type="file"
          onChange={handleChange}
          style={{ display: "none" }}
          ref={fileInputRef}
          accept="image/png, image/jpeg"
        />
      </label>
      <p>{fileName}</p>
    </Wrapper>
  );
};

export default FileInput;
