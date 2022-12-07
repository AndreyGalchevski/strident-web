import {
  FunctionComponent,
  useEffect,
  useState,
  MouseEventHandler,
} from "react";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";

import { fetchResources, deleteResource } from "../api/utils";
import { Lyric } from "../api/types";
import { useAuthContext } from "../context/authContext";
import useMediaQuery from "../hooks/useMediaQuery";
import Container from "../styled/Container";
import { Masonry, MasonryBrick } from "../styled/Masonry";
import { Card, CardTitle, CardContent, CardAction } from "../styled/Card";
import Button from "../components/Button";
import Header from "../components/Header";
import Fab from "../components/Fab";
import Loader from "../components/Loader";
import EditIcon from "../components/icons/Edit";
import DeleteIcon from "../components/icons/Delete";

const Text = styled.pre({
  fontFamily: '"Special Elite", cursive',
  fontSize: "13px",
  lineHeight: 1.5,
});

const Lyrics: FunctionComponent = () => {
  const [authState] = useAuthContext();
  const isMobile = useMediaQuery("(max-width: 767px)");
  const navigate = useNavigate();

  const [lyrics, setLyrics] = useState<Lyric[]>([]);
  const [isLoading, setLoading] = useState(false);

  async function fetchLyrics(): Promise<void> {
    setLoading(true);
    const resources = await fetchResources<Lyric>("lyrics");
    setLyrics(resources);
    setLoading(false);
  }

  useEffect(() => {
    fetchLyrics();
  }, []);

  function handleUpdateClick(lyricId: string): MouseEventHandler {
    return (): void => {
      navigate(`/admin/lyrics/edit/${lyricId}`);
    };
  }

  function handleDeleteClick(lyricId: string): MouseEventHandler {
    return async (): Promise<void> => {
      if (window.confirm("Are you sure you want to delete the lyric?")) {
        const res = await deleteResource("lyrics", lyricId);
        fetchLyrics();
        window.alert(res);
      }
    };
  }

  return (
    <Container>
      <Header title="Lyrics" />
      {authState.isAuthenticated && <Fab url="/admin/lyrics/new" />}
      <Loader isLoading={isLoading}>
        <Masonry isMobile={isMobile}>
          {lyrics.map((lyric) => (
            <MasonryBrick key={lyric.id}>
              <Card>
                <CardTitle style={{ paddingTop: 20 }}>{lyric.name}</CardTitle>
                <CardContent style={{ paddingTop: 0 }}>
                  <Text>{lyric.text}</Text>
                </CardContent>
                {authState.isAuthenticated && (
                  <CardAction>
                    <Button handleClick={handleUpdateClick(lyric.id)}>
                      <EditIcon />
                    </Button>
                    <Button isPrimary handleClick={handleDeleteClick(lyric.id)}>
                      <DeleteIcon />
                    </Button>
                  </CardAction>
                )}
              </Card>
            </MasonryBrick>
          ))}
        </Masonry>
      </Loader>
    </Container>
  );
};

export default Lyrics;
