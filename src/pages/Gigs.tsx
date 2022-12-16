import { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";

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
import useModal from "../hooks/useModal";
import useAuth from "../hooks/useAuth";
import useQueryResources from "../hooks/queries/useQueryResources";

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
      <Loader isLoading={gigsLoading}>
        <Masonry isMobile={isMobile}>
          {gigsData?.map((it) => (
            <MasonryBrick key={it.id}>
              <Card>
                <div>
                  <picture>
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
                    <Button onClick={() => handleUpdateClick(it.id)}>
                      <EditIcon />
                    </Button>
                    <Button isPrimary onClick={() => handleDeleteClick(it.id)}>
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
