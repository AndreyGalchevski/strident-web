import { FunctionComponent, useState, useEffect, ChangeEvent } from "react";
import styled from "styled-components";

import { Song } from "../../api/types";
import { fetchResource, updateResource, createResource } from "../../api/utils";
import useMediaQuery from "../../hooks/useMediaQuery";
import Container from "../../styled/Container";
import { Card, CardContent, CardAction } from "../../styled/Card";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Loader from "../../components/Loader";
import { useNavigate, useParams } from "react-router-dom";

const Wrapper = styled.div<{ isMobile: boolean }>(({ isMobile }) => ({
  width: isMobile ? "90vw" : "35vw",
  margin: "auto",
}));

const ManageSong: FunctionComponent = () => {
  const isMobile = useMediaQuery("(max-width: 767px)");
  const params = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [song, setSong] = useState<Song>({} as Song);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchSong(songID: string): Promise<void> {
      setLoading(true);
      const resource = await fetchResource("songs", songID);
      setSong(resource);
      setLoading(false);
    }

    if (params.id) {
      fetchSong(params.id);
    }
  }, [params.id]);

  function handleFormChange(e: ChangeEvent<HTMLInputElement>): void {
    setSong({ ...song, [e.target.name]: e.target.value });
  }

  async function handleSaveClick(): Promise<void> {
    let res = "";
    setLoading(true);
    if (params.id) {
      res = await updateResource<Song>("songs", params.id, song);
    } else {
      res = await createResource<Song>("songs", song);
    }
    navigate("/songs");
    setLoading(false);
    window.alert(res);
  }

  const action = params.id ? "Update" : "Create";

  return (
    <>
      <Container>
        <h2>{action} Song</h2>
        <Loader isLoading={isLoading}>
          <Wrapper isMobile={isMobile}>
            <Card>
              <CardContent>
                <Input
                  name="name"
                  type="text"
                  onChange={handleFormChange}
                  value={song.name}
                />
                <Input
                  name="url"
                  type="text"
                  onChange={handleFormChange}
                  value={song.url}
                />
                <Input
                  name="album"
                  type="text"
                  onChange={handleFormChange}
                  value={song.album}
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

export default ManageSong;
