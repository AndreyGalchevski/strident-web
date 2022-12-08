import { FunctionComponent, MouseEventHandler } from "react";
import { useNavigate } from "react-router-dom";

import { deleteResource } from "../api/utils";
import { useAuthContext } from "../context/authContext";
import useMediaQuery from "../hooks/useMediaQuery";
import { formatDate, formatTime } from "../utils/general";
import Container from "../styled/Container";
import { Masonry, MasonryBrick } from "../styled/Masonry";
import { Card, CardContent, CardImage, CardAction } from "../styled/Card";
import HalfwayTab from "../styled/HalfwayTab";
import Button from "../components/Button";
import Header from "../components/Header";
import Fab from "../components/Fab";
import Loader from "../components/Loader";
import EditIcon from "../components/icons/Edit";
import DeleteIcon from "../components/icons/Delete";
import DirectionsIcon from "../components/icons/Directions";
import EventIcon from "../components/icons/Event";
import useQueryGigs from "../hooks/queries/useQueryGigs";

const Gigs: FunctionComponent = () => {
  const [authState] = useAuthContext();
  const isMobile = useMediaQuery();
  const navigate = useNavigate();

  const { data: gigsData, isLoading: gigsLoading } = useQueryGigs();

  function handleUpdateClick(gigId: string): MouseEventHandler {
    return (): void => {
      navigate(`/admin/gigs/edit/${gigId}`);
    };
  }

  function handleDeleteClick(gigId: string): MouseEventHandler {
    return async (): Promise<void> => {
      if (window.confirm("Are you sure you want to delete the gig?")) {
        const res = await deleteResource("gigs", gigId);
        window.alert(res);
      }
    };
  }

  return (
    <Container>
      <Header title="Gigs" />
      {authState.isAuthenticated && <Fab url="/admin/gigs/new" />}
      <Loader isLoading={gigsLoading}>
        <Masonry isMobile={isMobile}>
          {gigsData?.map((gig) => (
            <MasonryBrick key={gig.id}>
              <Card>
                <div>
                  <picture>
                    <source srcSet={gig.imageNG} type="image/webp" />
                    <source srcSet={gig.image} type="image/jpeg" />
                    <CardImage src={gig.image} alt="" />
                  </picture>
                </div>
                <CardContent style={{ maxHeight: 202 }}>
                  <HalfwayTab
                    href={gig.fbEvent}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <EventIcon color="#3b5998" style={{ marginTop: 8 }} />
                  </HalfwayTab>
                  <HalfwayTab
                    href={`https://www.google.com/maps/search/?api=1&query=${gig.venue} ${gig.city}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ right: "auto", left: 24 }}
                  >
                    <DirectionsIcon color="#4A89F3" style={{ marginTop: 8 }} />
                  </HalfwayTab>
                  <p>{gig.venue}</p>
                  <p>
                    {gig.address}, {gig.city}
                  </p>
                  <p>{formatDate(new Date(gig.date))}</p>
                  <p>{formatTime(new Date(gig.date))}</p>
                </CardContent>
                {authState.isAuthenticated && (
                  <CardAction>
                    <Button handleClick={handleUpdateClick(gig.id)}>
                      <EditIcon />
                    </Button>
                    <Button isPrimary handleClick={handleDeleteClick(gig.id)}>
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

export default Gigs;
