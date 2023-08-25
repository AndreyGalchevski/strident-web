import { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

import useMediaQuery from "../hooks/useMediaQuery";
import Container from "../styled/Container";
import { Masonry, MasonryBrick } from "../styled/Masonry";
import { Card, CardTitle, CardContent, CardAction } from "../styled/Card";
import Button from "../components/Button";
import Header from "../components/Header";
import Fab from "../components/Fab";
import EditIcon from "../components/icons/Edit";
import DeleteIcon from "../components/icons/Delete";
import useQueryResources from "../hooks/queries/useQueryResources";
import useModal from "../hooks/useModal";
import useAuth from "../hooks/useAuth";
import theme from "../utils/theme";

const Skeletons: FunctionComponent<{ isMobile: boolean }> = ({ isMobile }) => {
  return (
    <SkeletonTheme
      baseColor={theme.colors.darkGrey}
      highlightColor={theme.colors.grey}
    >
      <Masonry isMobile={isMobile}>
        {[1, 2, 3, 4].map((it) => (
          <MasonryBrick key={it}>
            <Card>
              <CardTitle style={{ padding: 20, paddingBottom: 0 }}>
                <Skeleton height={20} width={200} />
              </CardTitle>
              <CardContent>
                <Skeleton count={1} style={{ marginBottom: 16 }} />
                <Skeleton count={1} style={{ marginBottom: 16 }} />
                <Skeleton count={1} style={{ marginBottom: 16 }} />
                <Skeleton count={1} style={{ marginBottom: 16 }} />
                <Skeleton count={1} style={{ marginBottom: 16 }} />
                <Skeleton count={1} style={{ marginBottom: 16 }} />
                <Skeleton count={1} style={{ marginBottom: 16 }} />
              </CardContent>
            </Card>
          </MasonryBrick>
        ))}
      </Masonry>
    </SkeletonTheme>
  );
};

const Text = styled.pre({
  fontFamily: '"Montserrat", sans-serif',
  fontSize: "13px",
  lineHeight: 1.5,
});

const Lyrics: FunctionComponent = () => {
  const auth = useAuth();
  const isMobile = useMediaQuery();
  const navigate = useNavigate();

  const { data: lyricsData, isLoading: lyricsLoading } =
    useQueryResources("lyrics");

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
      {auth.isAuthenticated && <Fab url="/admin/lyrics/create" />}
      {lyricsLoading ? (
        <Skeletons isMobile={isMobile} />
      ) : (
        <Masonry isMobile={isMobile}>
          {lyricsData?.map((it) => (
            <MasonryBrick key={it.id}>
              <Card>
                <CardTitle style={{ paddingTop: 20 }}>{it.name}</CardTitle>
                <CardContent style={{ paddingTop: 0 }}>
                  <Text>{it.text}</Text>
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

export default Lyrics;
