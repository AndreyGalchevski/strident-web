import { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";

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
import useQueryResources from "../hooks/queries/useQueryResources";
import useModal from "../hooks/useModal";
import useAuth from "../hooks/useAuth";

const Songs: FunctionComponent = () => {
  const auth = useAuth();
  const isMobile = useMediaQuery();
  const navigate = useNavigate();

  const { data: songsData, isLoading: songsLoading } =
    useQueryResources("songs");

  const modal = useModal();

  function handleUpdateClick(songID: string): void {
    navigate(`/admin/songs/edit/${songID}`);
  }

  function handleDeleteClick(songID: string): void {
    modal.showModal({
      modalType: "CONFIRM_DELETION",
      resourceID: songID,
      resourceName: "songs",
    });
  }

  return (
    <Container>
      <Header title="Songs" />
      {auth.isAuthenticated && <Fab url="/admin/songs/new" />}
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
                {auth.isAuthenticated && (
                  <CardAction>
                    <Button onClick={() => handleUpdateClick(song.id)}>
                      <EditIcon />
                    </Button>
                    <Button
                      isPrimary
                      onClick={() => handleDeleteClick(song.id)}
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

export default Songs;
