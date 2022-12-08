import { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";

import { useAuthContext } from "../context/AuthContext";
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
import useQueryVideos from "../hooks/queries/useQueryVideos";
import useModal from "../hooks/useModal";

const Videos: FunctionComponent = () => {
  const [authState] = useAuthContext();
  const isMobile = useMediaQuery();
  const navigate = useNavigate();

  const { data: videosData, isLoading: videosLoading } = useQueryVideos();

  const modal = useModal();

  function handleUpdateClick(videoID: string): void {
    navigate(`/admin/videos/edit/${videoID}`);
  }

  function handleDeleteClick(videoID: string): void {
    modal.showModal({
      modalType: "CONFIRM_DELETION",
      resourceID: videoID,
      resourceName: "videos",
    });
  }

  return (
    <Container>
      <Header title="Videos" />
      {authState.isAuthenticated && <Fab url="/admin/videos/new" />}
      <Loader isLoading={videosLoading}>
        <Masonry isMobile={isMobile}>
          {videosData?.map((video) => (
            <MasonryBrick key={video.id}>
              <Card>
                <CardContent style={{ padding: 0 }}>
                  <iframe
                    title={video.name}
                    src={video.url}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    width="100%"
                    height="315"
                    style={{ borderRadius: 30 }}
                  />
                </CardContent>
                {authState.isAuthenticated && (
                  <CardAction>
                    <Button handleClick={() => handleUpdateClick(video.id)}>
                      <EditIcon />
                    </Button>
                    <Button
                      isPrimary
                      handleClick={() => handleDeleteClick(video.id)}
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

export default observer(Videos);
