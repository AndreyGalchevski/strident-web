import { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

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
import useQueryLyrics from "../hooks/queries/useQueryLyrics";
import useModal from "../hooks/useModal";
import useAuth from "../hooks/useAuth";

const Text = styled.pre({
  fontFamily: '"Special Elite", cursive',
  fontSize: "13px",
  lineHeight: 1.5,
});

const Lyrics: FunctionComponent = () => {
  const auth = useAuth();
  const isMobile = useMediaQuery();
  const navigate = useNavigate();

  const { data: lyricsData, isLoading: lyricsLoading } = useQueryLyrics();

  const modal = useModal();

  function handleUpdateClick(lyricID: string): void {
    navigate(`/admin/lyrics/edit/${lyricID}`);
  }

  function handleDeleteClick(lyricID: string): void {
    modal.showModal({
      modalType: "CONFIRM_DELETION",
      resourceID: lyricID,
      resourceName: "lyrics",
    });
  }

  return (
    <Container>
      <Header title="Lyrics" />
      {auth.isAuthenticated && <Fab url="/admin/lyrics/new" />}
      <Loader isLoading={lyricsLoading}>
        <Masonry isMobile={isMobile}>
          {lyricsData?.map((lyric) => (
            <MasonryBrick key={lyric.id}>
              <Card>
                <CardTitle style={{ paddingTop: 20 }}>{lyric.name}</CardTitle>
                <CardContent style={{ paddingTop: 0 }}>
                  <Text>{lyric.text}</Text>
                </CardContent>
                {auth.isAuthenticated && (
                  <CardAction>
                    <Button handleClick={() => handleUpdateClick(lyric.id)}>
                      <EditIcon />
                    </Button>
                    <Button
                      isPrimary
                      handleClick={() => handleDeleteClick(lyric.id)}
                    >
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
