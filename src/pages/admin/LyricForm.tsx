import { FunctionComponent, useState, useEffect, ChangeEvent } from "react";
import styled from "styled-components";
import { observer } from "mobx-react-lite";

import { Lyric } from "../../api/types";
import useMediaQuery from "../../hooks/useMediaQuery";
import Container from "../../styled/Container";
import { Card, CardContent, CardAction } from "../../styled/Card";
import Button from "../../components/Button";
import Input from "../../components/Input";
import TextArea from "../../components/TextArea";
import Loader from "../../components/Loader";
import useModal from "../../hooks/useModal";
import useQueryResources from "../../hooks/queries/useQueryResources";
import { OnSaveClickParams } from "../../types";

const Wrapper = styled.div<{ isMobile: boolean }>(({ isMobile }) => ({
  width: isMobile ? "90vw" : "35vw",
  margin: "auto",
}));

interface Props {
  title: string;
  isSaving: boolean;
  onSaveClick: (params: OnSaveClickParams<Lyric>) => Promise<void>;
  isLoading?: boolean;
  initialData?: Lyric;
}

const LyricForm: FunctionComponent<Props> = ({
  title,
  isSaving,
  onSaveClick,
  isLoading = false,
  initialData,
}) => {
  const isMobile = useMediaQuery();

  const [lyric, setLyric] = useState<Lyric>({
    id: "",
    name: "",
    text: "",
  });

  const modal = useModal();

  useQueryResources("lyrics");

  useEffect(() => {
    if (initialData) {
      setLyric(initialData);
    }
  }, [initialData]);

  function handleNameChange(e: ChangeEvent<HTMLInputElement>): void {
    setLyric({ ...lyric, name: e.target.value });
  }

  function handleTextChange(e: ChangeEvent<HTMLTextAreaElement>): void {
    setLyric({ ...lyric, text: e.target.value });
  }

  async function handleSaveClick(): Promise<void> {
    try {
      await onSaveClick({ formData: lyric });
      modal.showModal({ modalType: "RESOURCE_SAVED", resourceName: "lyrics" });
    } catch (e) {
      modal.showModal({
        modalType: "ERROR",
        errorMessage: (e as Error).message,
      });
    }
  }

  return (
    <>
      <Container>
        <h2>{title}</h2>
        <Loader isLoading={isLoading}>
          <Wrapper isMobile={isMobile}>
            <Card>
              <CardContent>
                <Input
                  name="name"
                  type="text"
                  onChange={handleNameChange}
                  value={lyric.name}
                />
                <TextArea
                  name="text"
                  onChange={handleTextChange}
                  value={lyric.text}
                />
              </CardContent>
              <CardAction>
                <Button onClick={handleSaveClick} isLoading={isSaving}>
                  Save
                </Button>
              </CardAction>
            </Card>
          </Wrapper>
        </Loader>
      </Container>
    </>
  );
};

export default observer(LyricForm);
