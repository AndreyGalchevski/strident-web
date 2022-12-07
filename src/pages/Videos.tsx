import {
  FunctionComponent,
  useState,
  useEffect,
  MouseEventHandler,
} from "react";
import { useNavigate } from "react-router-dom";

import { fetchResources, deleteResource } from "../api/utils";
import { Video } from "../api/types";
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

const Videos: FunctionComponent = () => {
  const [authState] = useAuthContext();
  const isMobile = useMediaQuery("(max-width: 767px)");
  const navigate = useNavigate();

  const [videos, setVideos] = useState<Video[]>([]);
  const [isLoading, setLoading] = useState(false);

  async function fetchVideos(): Promise<void> {
    setLoading(true);
    const resources = await fetchResources<Video>("videos");
    setVideos(resources);
    setLoading(false);
  }

  useEffect(() => {
    fetchVideos();
  }, []);

  function handleUpdateClick(videoId: string): MouseEventHandler {
    return (): void => {
      navigate(`/admin/videos/edit/${videoId}`);
    };
  }

  function handleDeleteClick(videoId: string): MouseEventHandler {
    return async (): Promise<void> => {
      if (window.confirm("Are you sure you want to delete the video?")) {
        const res = await deleteResource("videos", videoId);
        fetchVideos();
        window.alert(res);
      }
    };
  }

  return (
    <Container>
      <Header title="Videos" />
      {authState.isAuthenticated && <Fab url="/admin/videos/new" />}
      <Loader isLoading={isLoading}>
        <Masonry isMobile={isMobile}>
          {videos.map((video) => (
            <MasonryBrick key={video.id}>
              <Card>
                <CardContent style={{ padding: 0 }}>
                  <iframe
                    title={video.name}
                    src={video.url}
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                    frameBorder="0"
                    width="100%"
                    height="60%"
                    style={{ borderRadius: 30 }}
                  />
                </CardContent>
                {authState.isAuthenticated && (
                  <CardAction>
                    <Button handleClick={handleUpdateClick(video.id)}>
                      <EditIcon />
                    </Button>
                    <Button isPrimary handleClick={handleDeleteClick(video.id)}>
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

export default Videos;
