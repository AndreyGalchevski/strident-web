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

const IFRAME_HEIGHT = 500;

const SingleSkeleton = () => {
  return (
    <SkeletonTheme
      baseColor={theme.colors.darkGrey}
      highlightColor={theme.colors.grey}
    >
      <Skeleton height={IFRAME_HEIGHT} borderRadius={30} />
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
        {[1, 2, 3].map((it) => (
          <MasonryBrick key={it}>
            <Card>
              <Skeleton height={IFRAME_HEIGHT} borderRadius={30} />
            </Card>
          </MasonryBrick>
        ))}
      </Masonry>
    </SkeletonTheme>
  );
};

const Albums: FunctionComponent = () => {
  const auth = useAuth();
  const isMobile = useMediaQuery();
  const navigate = useNavigate();

  const { data: albumsData, isLoading: albumsLoading } =
    useQueryResources("albums");

  const modal = useModal();

  function handleUpdateClick(albumID: string): void {
    navigate(`/admin/music/edit/${albumID}`);
  }

  function handleDeleteClick(albumID: string): void {
    modal.showModal({
      modalType: "CONFIRM_DELETION",
      resourceID: albumID,
      resourceName: "albums",
    });
  }

  return (
    <Container>
      <Header title="Music" />
      {auth.isAuthenticated && <Fab url="/admin/music/create" />}
      {albumsLoading ? (
        <Skeletons isMobile={isMobile} />
      ) : (
        <Masonry isMobile={isMobile}>
          {albumsData?.map((it) => (
            <MasonryBrick key={it.id}>
              <Card>
                <CardContent style={{ padding: 0 }}>
                  <LoadableIFrame
                    title={it.name}
                    src={it.url}
                    style={{ borderRadius: 30 }}
                    height={IFRAME_HEIGHT}
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

export default Albums;
