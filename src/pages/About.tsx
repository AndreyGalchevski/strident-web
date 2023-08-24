import { FunctionComponent } from "react";
import styled from "styled-components";

import useMediaQuery from "../hooks/useMediaQuery";
import Header from "../components/Header";
import Container from "../styled/Container";
import ResponsiveText from "../styled/ResponsiveText";
import { Card, CardContent } from "../styled/Card";

const Wrapper = styled.div<{ isMobile: boolean }>(({ isMobile }) => ({
  width: isMobile ? "90vw" : "70vw",
  margin: "auto",
}));

const About: FunctionComponent = () => {
  const isMobile = useMediaQuery();

  return (
    <Container>
      <Header title="About" />
      <Wrapper isMobile={isMobile}>
        <Card>
          <CardContent>
            <ResponsiveText isMobile={isMobile}>
              An Israeli Thrash Metal machine, Strident is heavily armed with
              old school riffs and the 80s vibe, having been influenced by the
              German Thrash scene (Sodom, Destruction and Tankard), as well as
              the American scene (Slayer, Megadeth and Exodus) while also having
              its roots deep in the high-energy rock-and-roll of Motorhead
            </ResponsiveText>
            <ResponsiveText isMobile={isMobile}>
              Since its inception in 2005, Strident has had three full-length
              studio albums and a huge number of live performances. The band's
              debut LP entitled "On the Aim" came out in 2010 after which the
              band went on a semi-hiatus for almost a decade due to numerous
              lineup changes, but nevertheless Strident remained an active band
              playing big shows: opening for Overkill and Nervosa, to name a
              few. The second record, “March of Plague”, was released in 2019
              through the Italian label "Punishment 18 Records". It has a solid
              modern sound and it has been selling all over the world.
            </ResponsiveText>
            <ResponsiveText isMobile={isMobile}>
              In 2020, the line-up changed again, this time the original
              guitarist Michael Shlyapochny became also the frontman while Yaniv
              Alkalay, Andrey Galchevski, Artyom Apekishev took over lead
              guitar, drums and bass respectively. With this line-up, the band
              went on 3 European tours (with Necronomicon, Archaic and Jet
              Jaguar) and released the third album, "Paranoia of the Tyrant",
              which has received great praise both in live shows and in media
              spheres.
            </ResponsiveText>
            <ResponsiveText isMobile={isMobile}>
              Strident has its own crushing energy, authentic style and tight
              live performance, exactly what people are looking for in this
              style of music.
            </ResponsiveText>
          </CardContent>
        </Card>
      </Wrapper>
    </Container>
  );
};

export default About;
