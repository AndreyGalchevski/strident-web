import { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

import useMediaQuery from "../hooks/useMediaQuery";
import Container from "../styled/Container";
import { Card, CardContent, CardTitle, CardAction } from "../styled/Card";
import ResponsiveText from "../styled/ResponsiveText";
import Header from "../components/Header";
import { homeImages } from "../utils/constants";
import useQueryResources from "../hooks/queries/useQueryResources";
import theme from "../utils/theme";

const Wrapper = styled.div<{ isMobile: boolean }>(({ isMobile }) => ({
  display: "flex",
  flexDirection: isMobile ? "column" : "row",
  marginBottom: 20,
}));

const ImageGalleryWrapper = styled.div({
  marginBottom: 20,
});

const Home: FunctionComponent = () => {
  const isMobile = useMediaQuery();

  const { data: gigsData, isLoading: gigsLoading } = useQueryResources("gigs");

  return (
    <Container>
      <Header title="Home" />

      <ImageGalleryWrapper>
        <ImageGallery items={homeImages} />
      </ImageGalleryWrapper>

      <Wrapper isMobile={isMobile}>
        <Card style={{ margin: 8, flex: 1 }}>
          <CardContent>
            <CardTitle>About</CardTitle>
            <ResponsiveText isMobile={isMobile}>
              An Israeli Thrash Metal machine, Strident is heavily armed with
              old school riffs and the 80s vibe.
            </ResponsiveText>
            <ResponsiveText isMobile={isMobile}>
              Since its inception in 2005, Strident has had three full-length
              studio albums and a huge number of live performances.
            </ResponsiveText>
            <ResponsiveText isMobile={isMobile}>
              The band's debut LP entitled "On the Aim" came out in 2010...
            </ResponsiveText>
          </CardContent>
          <CardAction>
            <Link to="about" style={{ color: theme.colors.white }}>
              Read more
            </Link>
          </CardAction>
        </Card>

        <Card style={{ margin: 8, flex: 1 }}>
          <CardContent style={{ padding: 0, height: 343 }}>
            <iframe
              title="STRIDENT - No Faith No War"
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/3MpjGJpmG-Y"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{ borderTopLeftRadius: 30, borderTopRightRadius: 30 }}
            />
          </CardContent>
          <CardAction>
            <Link to="/videos" style={{ color: theme.colors.white }}>
              More videos
            </Link>
          </CardAction>
        </Card>
      </Wrapper>

      <Wrapper isMobile={isMobile} style={{ marginTop: 20 }}>
        {gigsLoading ? (
          <p>Loading...</p>
        ) : (
          <Card style={{ margin: 8, flex: 1 }}>
            <CardContent>
              <CardTitle>Gigs</CardTitle>
              {gigsData?.slice(0, 3).map((gig) => (
                <div key={gig.id}>
                  <p>{new Date(gig.date).toDateString()}</p>
                  <p>
                    {gig.name} - {gig.venue}
                  </p>
                  <p>{gig.city}</p>
                  <hr />
                </div>
              ))}
            </CardContent>
            <CardAction>
              <Link to="/gigs" style={{ color: theme.colors.white }}>
                More gigs
              </Link>
            </CardAction>
          </Card>
        )}

        <Card style={{ margin: 8, flex: 1 }}>
          <CardContent style={{ padding: 0, height: 451 }}>
            <iframe
              title="Strident Spotify page"
              src="https://open.spotify.com/embed/artist/1iLO8tqlkfiQMWf7JqaNE3"
              width="100%"
              height="100%"
              allow="encrypted-media"
              style={{ borderTopLeftRadius: 30, borderTopRightRadius: 30 }}
            />
          </CardContent>
          <CardAction>
            <Link to="/songs" style={{ color: theme.colors.white }}>
              More songs
            </Link>
          </CardAction>
        </Card>
      </Wrapper>
    </Container>
  );
};

export default Home;
