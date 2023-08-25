import { CSSProperties, FunctionComponent } from "react";
import styled from "styled-components";

import FacebookIcon from "../components/icons/Facebook";
import InstagramIcon from "../components/icons/Instagram";
import BandcampIcon from "../components/icons/Bandcamp";
import YoutubeIcon from "../components/icons/Youtube";
import SpotifyIcon from "../components/icons/Spotify";

const Container = styled.footer(({ theme: { colors } }) => ({
  position: "fixed",
  bottom: "0",
  width: "100%",
  height: "5vh",
  backgroundColor: colors.black,
  color: colors.white,
  zIndex: 99,
  transition: "height 0.5s ease-out",
}));

const Content = styled.p({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  height: "5vh",
  margin: "0",
});

const SocialMediaLink = styled.a({
  paddingLeft: "0.5em",
  paddingRight: "0.5em",
});

interface Props {
  style?: CSSProperties;
}

const Footer: FunctionComponent<Props> = ({ style = {} }) => {
  return (
    <Container style={style}>
      <Content>
        <span>
          <SocialMediaLink
            href="https://www.facebook.com/stridentthrash"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Follow Strident on Facebook"
          >
            <FacebookIcon />
          </SocialMediaLink>
          <SocialMediaLink
            href="https://www.instagram.com/strident.thrash"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Follow Strident on Instagram"
          >
            <InstagramIcon />
          </SocialMediaLink>
          <SocialMediaLink
            href="https://stridentthrash.bandcamp.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Follow Strident on Bandcamp"
          >
            <BandcampIcon />
          </SocialMediaLink>
          <SocialMediaLink
            href="https://www.youtube.com/user/MrThrashmaster"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Watch Strident on Youtube"
          >
            <YoutubeIcon />
          </SocialMediaLink>
          <SocialMediaLink
            href="https://open.spotify.com/artist/1iLO8tqlkfiQMWf7JqaNE3"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Listen to Strident on Spotify"
          >
            <SpotifyIcon />
          </SocialMediaLink>
        </span>
      </Content>
    </Container>
  );
};

export default Footer;
