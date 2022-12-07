import {
  FunctionComponent,
  useState,
  useEffect,
  MouseEventHandler,
} from "react";
import { useNavigate } from "react-router-dom";

import { Gig } from "../api/types";
import { fetchResources, deleteResource } from "../api/utils";
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

const Gigs: FunctionComponent = () => {
  const [authState] = useAuthContext();
  const isMobile = useMediaQuery("(max-width: 767px)");
  const navigate = useNavigate();

  const [gigs, setGigs] = useState<Gig[]>([]);
  const [isLoading, setLoading] = useState(false);

  async function fetchGigs(): Promise<void> {
    setLoading(true);
    const resources = await fetchResources<Gig>("gigs");
    setGigs(resources);
    setLoading(false);
  }

  useEffect(() => {
    fetchGigs();
  }, []);

  function handleUpdateClick(gigId: string): MouseEventHandler {
    return (): void => {
      navigate(`/admin/gigs/edit/${gigId}`);
    };
  }

  function handleDeleteClick(gigId: string): MouseEventHandler {
    return async (): Promise<void> => {
      if (window.confirm("Are you sure you want to delete the gig?")) {
        const res = await deleteResource("gigs", gigId);
        fetchGigs();
        window.alert(res);
      }
    };
  }

  return (
    <Container>
      <Header title="Gigs" />
      {authState.isAuthenticated && <Fab url="/admin/gigs/new" />}
      <Loader isLoading={isLoading}>
        <Masonry isMobile={isMobile}>
          {gigs.map((gig) => (
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
