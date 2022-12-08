import { FunctionComponent, useState, useEffect, ChangeEvent } from "react";
import styled from "styled-components";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";

import { Lyric } from "../../api/types";
import { fetchResource, updateResource, createResource } from "../../api/utils";
import useMediaQuery from "../../hooks/useMediaQuery";
import Container from "../../styled/Container";
import { Card, CardContent, CardAction } from "../../styled/Card";
import Button from "../../components/Button";
import Input from "../../components/Input";
import TextArea from "../../components/TextArea";
import Loader from "../../components/Loader";
import useModal from "../../hooks/useModal";

const Wrapper = styled.div<{ isMobile: boolean }>(({ isMobile }) => ({
  width: isMobile ? "90vw" : "35vw",
  margin: "auto",
}));

const ManageLyric: FunctionComponent = () => {
  const isMobile = useMediaQuery();
  const params = useParams<{ id: string }>();

  const [lyric, setLyric] = useState<Lyric>({} as Lyric);
  const [isLoading, setLoading] = useState(false);

  const modal = useModal();

  async function fetchLyric(lyricID: string): Promise<void> {
    setLoading(true);
    const resource = await fetchResource("lyrics", lyricID);
    setLyric(resource);
    setLoading(false);
  }

  useEffect(() => {
    if (params.id) {
      fetchLyric(params.id);
    }
  }, [params.id]);

  function handleNameChange(e: ChangeEvent<HTMLInputElement>): void {
    setLyric({ ...lyric, name: e.target.value });
  }

  function handleTextChange(e: ChangeEvent<HTMLTextAreaElement>): void {
    setLyric({ ...lyric, text: e.target.value });
  }

  async function handleSaveClick(): Promise<void> {
    setLoading(true);
    if (params.id) {
      await updateResource<Lyric>("lyrics", params.id, lyric);
    } else {
      await createResource<Lyric>("lyrics", lyric);
    }
    setLoading(false);

    modal.showModal({ modalType: "RESOURCE_CREATED", resourceName: "lyrics" });
  }

  const action = params.id ? "Update" : "Create";

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
                <Button handleClick={handleSaveClick}>Save</Button>
              </CardAction>
            </Card>
          </Wrapper>
        </Loader>
      </Container>
    </>
  );
};

export default observer(ManageLyric);
