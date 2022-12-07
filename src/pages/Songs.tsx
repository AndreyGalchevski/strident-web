import { FunctionComponent, MouseEventHandler } from "react";
import { useNavigate } from "react-router-dom";

import { deleteResource } from "../api/utils";
import { useAuthContext } from "../context/authContext";
import useMediaQuery from "../hooks/useMediaQuery";
import Container from "../styled/Container";
import { Masonry, MasonryBrick } from "../styled/Masonry";
import { Card, CardContent, CardAction } from "../styled/Card";
import Header from "../components/Header";
import Button from "../components/Button";
import Fab from "../components/Fab";
import Loader from "../components/Loader";
import EditIcon from "../components/icons/Edit";
import DeleteIcon from "../components/icons/Delete";
import useQuerySongs from "../hooks/useQuerySongs";

const Songs: FunctionComponent = () => {
  const [authState] = useAuthContext();
  const isMobile = useMediaQuery();
  const navigate = useNavigate();

  const { data: songsData, isLoading: songsLoading } = useQuerySongs();

  function handleUpdateClick(songId: string): MouseEventHandler {
    return (): void => {
      navigate(`/admin/songs/edit/${songId}`);
    };
  }

  function handleDeleteClick(songId: string): MouseEventHandler {
    return async (): Promise<void> => {
      if (window.confirm("Are you sure you want to delete the song?")) {
        const res = await deleteResource("songs", songId);
        window.alert(res);
      }
    };
  }

  return (
    <Container>
      <Header title="Songs" />
      {authState.isAuthenticated && <Fab url="/admin/songs/new" />}
      <Loader isLoading={songsLoading}>
        <Masonry isMobile={isMobile}>
          {songsData?.map((song) => (
            <MasonryBrick key={song.id}>
              <Card>
                <CardContent style={{ padding: 0 }}>
                  <iframe
                    title={song.name}
                    src={song.url}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    width="100%"
                    height="236"
                    style={{ borderRadius: 30 }}
                  />
                </CardContent>
                {authState.isAuthenticated && (
                  <CardAction>
                    <Button handleClick={handleUpdateClick(song.id)}>
                      <EditIcon />
                    </Button>
                    <Button isPrimary handleClick={handleDeleteClick(song.id)}>
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

export default Songs;
