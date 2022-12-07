import { FunctionComponent, MouseEventHandler } from "react";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";

import { deleteResource } from "../api/utils";
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
import useQueryLyrics from "../hooks/useQueryLyrics";

const Text = styled.pre({
  fontFamily: '"Special Elite", cursive',
  fontSize: "13px",
  lineHeight: 1.5,
});

const Lyrics: FunctionComponent = () => {
  const [authState] = useAuthContext();
  const isMobile = useMediaQuery("(max-width: 767px)");
  const navigate = useNavigate();

  const { data: lyricsData, isLoading: lyricsLoading } = useQueryLyrics();

  function handleUpdateClick(lyricId: string): MouseEventHandler {
    return (): void => {
      navigate(`/admin/lyrics/edit/${lyricId}`);
    };
  }

  function handleDeleteClick(lyricId: string): MouseEventHandler {
    return async (): Promise<void> => {
      if (window.confirm("Are you sure you want to delete the lyric?")) {
        const res = await deleteResource("lyrics", lyricId);
        window.alert(res);
      }
    };
  }

  return (
    <Container>
      <Header title="Lyrics" />
      {authState.isAuthenticated && <Fab url="/admin/lyrics/new" />}
      <Loader isLoading={lyricsLoading}>
        <Masonry isMobile={isMobile}>
          {lyricsData?.map((lyric) => (
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
