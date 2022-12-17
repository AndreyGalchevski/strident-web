import { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";

import useMediaQuery from "../hooks/useMediaQuery";
import Container from "../styled/Container";
import { Masonry, MasonryBrick } from "../styled/Masonry";
import { Card, CardContent, CardAction } from "../styled/Card";
import Header from "../components/Header";
import Button from "../components/Button";
import Fab from "../components/Fab";
import EditIcon from "../components/icons/Edit";
import DeleteIcon from "../components/icons/Delete";
import useQueryResources from "../hooks/queries/useQueryResources";
import useModal from "../hooks/useModal";
import useAuth from "../hooks/useAuth";
import LoadableIFrame from "../components/LoadableIFrame";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import theme from "../utils/theme";

const SingleSkeleton = () => {
  return (
    <SkeletonTheme
      baseColor={theme.colors.darkGrey}
      highlightColor={theme.colors.grey}
    >
      <Skeleton height={236} borderRadius={30} />
    </SkeletonTheme>
  );
};

const Skeletons: FunctionComponent<{ isMobile: boolean }> = ({ isMobile }) => {
  return (
    <SkeletonTheme
      baseColor={theme.colors.darkGrey}
      highlightColor={theme.colors.grey}
    >
      <Masonry isMobile={isMobile}>
        {[1, 2, 3, 4, 5, 6].map((it) => (
          <MasonryBrick key={it}>
            <Card>
              <Skeleton height={236} borderRadius={30} />
            </Card>
          </MasonryBrick>
        ))}
      </Masonry>
    </SkeletonTheme>
  );
};

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
      {auth.isAuthenticated && <Fab url="/admin/songs/create" />}
      {songsLoading ? (
        <Skeletons isMobile={isMobile} />
      ) : (
        <Masonry isMobile={isMobile}>
          {songsData?.map((it) => (
            <MasonryBrick key={it.id}>
              <Card>
                <CardContent style={{ padding: 0 }}>
                  <LoadableIFrame
                    title={it.name}
                    src={it.url}
                    style={{ borderRadius: 30 }}
                    loader={<SingleSkeleton />}
                  />
                </CardContent>
                {auth.isAuthenticated && (
                  <CardAction>
                    <Button
                      isPrimary={false}
                      onClick={() => handleUpdateClick(it.id)}
                    >
                      <EditIcon />
                    </Button>
                    <Button
                      isPrimary={false}
                      onClick={() => handleDeleteClick(it.id)}
                    >
                      <DeleteIcon />
                    </Button>
                  </CardAction>
                )}
              </Card>
            </MasonryBrick>
          ))}
        </Masonry>
      )}
    </Container>
  );
};

export default Songs;
