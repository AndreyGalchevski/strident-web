import { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

import useMediaQuery from "../hooks/useMediaQuery";
import { formatDate, formatTime, getWebPImageURL } from "../utils/general";
import Container from "../styled/Container";
import { Masonry, MasonryBrick } from "../styled/Masonry";
import { Card, CardContent, CardImage, CardAction } from "../styled/Card";
import HalfwayTab from "../styled/HalfwayTab";
import Button from "../components/Button";
import Header from "../components/Header";
import Fab from "../components/Fab";
import EditIcon from "../components/icons/Edit";
import DeleteIcon from "../components/icons/Delete";
import DirectionsIcon from "../components/icons/Directions";
import EventIcon from "../components/icons/Event";
import useModal from "../hooks/useModal";
import useAuth from "../hooks/useAuth";
import useQueryResources from "../hooks/queries/useQueryResources";
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
              <Skeleton
                height={200}
                style={{
                  borderTopLeftRadius: 30,
                  borderTopRightRadius: 30,
                  borderBottomLeftRadius: 0,
                  borderBottomRightRadius: 0,
                }}
              />
              <CardContent style={{ maxHeight: 202 }}>
                <Skeleton count={1} style={{ marginBottom: 16 }} />
                <Skeleton count={1} style={{ marginBottom: 16 }} />
                <Skeleton count={1} style={{ marginBottom: 16 }} />
                <Skeleton count={1} style={{ marginBottom: 30 }} />
              </CardContent>
            </Card>
          </MasonryBrick>
        ))}
      </Masonry>
    </SkeletonTheme>
  );
};

const Gigs: FunctionComponent = () => {
  const auth = useAuth();
  const isMobile = useMediaQuery();
  const navigate = useNavigate();

  const { data: gigsData, isLoading: gigsLoading } = useQueryResources("gigs");

  const modal = useModal();

  function handleUpdateClick(gigID: string): void {
    navigate(`/admin/gigs/edit/${gigID}`);
  }

  function handleDeleteClick(gigID: string): void {
    modal.showModal({
      modalType: "CONFIRM_DELETION",
      resourceID: gigID,
      resourceName: "gigs",
    });
  }

  return (
    <Container>
      <Header title="Gigs" />
      {auth.isAuthenticated && <Fab url="/admin/gigs/create" />}
      {gigsLoading ? (
        <Skeletons isMobile={isMobile} />
      ) : (
        <Masonry isMobile={isMobile}>
          {gigsData?.map((it) => (
            <MasonryBrick key={it.id}>
              <Card>
                <div>
                  <picture>
                    <source
                      srcSet={getWebPImageURL(it.image)}
                      type="image/webp"
                    />
                    <source srcSet={it.image} type="image/jpeg" />
                    <CardImage src={it.image} alt="" />
                  </picture>
                </div>
                <CardContent style={{ maxHeight: 202 }}>
                  <HalfwayTab
                    href={it.fbEvent}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <EventIcon color="#3b5998" style={{ marginTop: 8 }} />
                  </HalfwayTab>
                  <HalfwayTab
                    href={`https://www.google.com/maps/search/?api=1&query=${it.venue} ${it.city}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ right: "auto", left: 24 }}
                  >
                    <DirectionsIcon color="#4A89F3" style={{ marginTop: 8 }} />
                  </HalfwayTab>
                  <p>{it.venue}</p>
                  <p>
                    {it.address}, {it.city}
                  </p>
                  <p>{formatDate(new Date(it.date))}</p>
                  <p>{formatTime(new Date(it.date))}</p>
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

export default Gigs;
