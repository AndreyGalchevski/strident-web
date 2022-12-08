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
import useQueryGigs from "../hooks/queries/useQueryGigs";
import theme from "../utils/theme";

const BannerContainer = styled.div({
  marginBottom: 20,
});

const Banner = styled.img(({ theme: { colors } }) => ({
  height: "74vh",
  maxWidth: "90vw",
  boxShadow: `0 4px 8px 0 ${colors.black}, 0 6px 20px 0 ${colors.black}`,
}));

const Wrapper = styled.div<{ isMobile: boolean }>(({ isMobile }) => ({
  display: "flex",
  flexDirection: isMobile ? "column" : "row",
  marginBottom: 20,
}));

const Home: FunctionComponent = () => {
  const isMobile = useMediaQuery();

  const { data: gigsData, isLoading: gigsLoading } = useQueryGigs();

  return (
    <Container>
      <Header title="Home" />
      <BannerContainer>
        <picture>
          <source
            media="(max-width: 785px)"
            srcSet="https://res.cloudinary.com/dqvimfd8b/image/upload/v1572275145/strident/app/march-of-plague-banner-high-ng.webp"
            type="image/webp"
          />
          <source
            media="(max-width: 785px)"
            srcSet="https://res.cloudinary.com/dqvimfd8b/image/upload/v1572274125/strident/app/march-of-plague-banner-high.jpg"
            type="image/jpeg"
          />
          <source
            media="(min-width: 786px)"
            srcSet="https://res.cloudinary.com/dqvimfd8b/image/upload/v1572275146/strident/app/march-of-plague-banner-wide-ng.webp"
            type="image/webp"
          />
          <source
            media="(min-width: 786px)"
            srcSet="https://res.cloudinary.com/dqvimfd8b/image/upload/v1572274888/strident/app/march-of-plague-banner-wide.jpg"
            type="image/jpeg"
          />
          <Banner
            src="https://res.cloudinary.com/dqvimfd8b/image/upload/v1572274125/strident/app/march-of-plague-banner-high.jpg"
            alt="New Album banner"
          />
        </picture>
      </BannerContainer>
      <Wrapper isMobile={isMobile}>
        <Card style={{ margin: 8, flex: 1 }}>
          <CardContent>
            <CardTitle>About</CardTitle>
            <ResponsiveText isMobile={isMobile}>
              Strident is an Israeli Thrash Metal band with old-school riffing
              and vibes from the 80s.
            </ResponsiveText>
            <ResponsiveText isMobile={isMobile}>
              We are not afraid to be ourselves and do what we want.
            </ResponsiveText>
            <ResponsiveText isMobile={isMobile}>
              Thrash Till Death
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
      <ImageGallery items={homeImages} />
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
