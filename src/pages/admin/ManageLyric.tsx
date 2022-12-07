import { FunctionComponent, useState, useEffect, ChangeEvent } from "react";
import styled from "styled-components";

import { Lyric } from "../../api/types";
import { fetchResource, updateResource, createResource } from "../../api/utils";
import useMediaQuery from "../../hooks/useMediaQuery";
import Container from "../../styled/Container";
import { Card, CardContent, CardAction } from "../../styled/Card";
import Button from "../../components/Button";
import Input from "../../components/Input";
import TextArea from "../../components/TextArea";
import Loader from "../../components/Loader";
import { useNavigate, useParams } from "react-router-dom";

const Wrapper = styled.div<{ isMobile: boolean }>(({ isMobile }) => ({
  width: isMobile ? "90vw" : "35vw",
  margin: "auto",
}));

const ManageLyric: FunctionComponent = () => {
  const isMobile = useMediaQuery("(max-width: 767px)");
  const params = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [lyric, setLyric] = useState<Lyric>({} as Lyric);
  const [isLoading, setLoading] = useState(false);

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
    let res = "";
    setLoading(true);
    if (params.id) {
      res = await updateResource<Lyric>("lyrics", params.id, lyric);
    } else {
      res = await createResource<Lyric>("lyrics", lyric);
    }
    setLoading(false);
    navigate("/lyrics");

    window.alert(res);
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

export default ManageLyric;
