import { FunctionComponent, useState, useEffect, ChangeEvent } from "react";
import styled from "styled-components";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";

import { Lyric } from "../../api/types";
import useMediaQuery from "../../hooks/useMediaQuery";
import Container from "../../styled/Container";
import { Card, CardContent, CardAction } from "../../styled/Card";
import Button from "../../components/Button";
import Input from "../../components/Input";
import TextArea from "../../components/TextArea";
import Loader from "../../components/Loader";
import useModal from "../../hooks/useModal";
import useQuerySingleResource from "../../hooks/queries/useQuerySingleResource";
import useMutationUpdateResource from "../../hooks/mutations/useMutationUpdateResource";
import useMutationCreateResource from "../../hooks/mutations/useMutationCreateResource";
import useQueryResources from "../../hooks/queries/useQueryResources";

const Wrapper = styled.div<{ isMobile: boolean }>(({ isMobile }) => ({
  width: isMobile ? "90vw" : "35vw",
  margin: "auto",
}));

const ManageLyric: FunctionComponent = () => {
  const isMobile = useMediaQuery();
  const params = useParams<{ id: string }>();

  const [lyric, setLyric] = useState<Lyric>({
    id: "",
    name: "",
    text: "",
  });

  const modal = useModal();

  useQueryResources("lyrics");

  const { data: lyricData, isLoading } = useQuerySingleResource(
    "lyrics",
    params.id,
    {
      enabled: !!params?.id,
    }
  );

  const { mutateAsync: createResource, isLoading: createResourceLoading } =
    useMutationCreateResource();
  const { mutateAsync: updateResource, isLoading: updateResourceLoading } =
    useMutationUpdateResource();

  useEffect(() => {
    if (lyricData) {
      setLyric(lyricData);
    }
  }, [lyricData]);

  function handleNameChange(e: ChangeEvent<HTMLInputElement>): void {
    setLyric({ ...lyric, name: e.target.value });
  }

  function handleTextChange(e: ChangeEvent<HTMLTextAreaElement>): void {
    setLyric({ ...lyric, text: e.target.value });
  }

  async function handleSaveClick(): Promise<void> {
    if (params.id) {
      await updateResource({
        resourceName: "lyrics",
        resourceID: params.id,
        data: lyric,
      });
    } else {
      await createResource({ resourceName: "lyrics", data: lyric });
    }

    modal.showModal({ modalType: "RESOURCE_SAVED", resourceName: "lyrics" });
  }

  const action = params.id ? "Update" : "Create";

  const isSaving = createResourceLoading || updateResourceLoading;

  return (
    <>
      <Container>
        <h2>{action} Lyric</h2>
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

export default observer(ManageLyric);
