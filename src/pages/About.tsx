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
              Strident is a Thrash Metal band formed in 2004 in the ancient city
              of Be`er Sheva (Israel). Starting from playing cover versions of
              such famous groups as Iron Maiden, AC / DC, etc and having come a
              long way, they found their style in the Israeli metal scene,
              despite the fact that in those years the scene was flooded with
              black metal and many hardcore bands. style.
            </ResponsiveText>
            <ResponsiveText isMobile={isMobile}>
              The group released its first album “On Aim” (2010), which raised
              the main problems of this world, on its own, thus challenging
              other popular styles. This album has become somewhat legendary, as
              it was the first full-length thrash metal album released in Israel
              back in the day.
            </ResponsiveText>
            <ResponsiveText isMobile={isMobile}>
              On 29 November 2019, the second album “March Of Plague” was
              released worldwide through Punishment 18 Records
            </ResponsiveText>
            <ResponsiveText isMobile={isMobile}>
              In the Autumn of 2022 the band did their first European tour along
              with 3000AD supporting the German Thrash legends Necronomicon -
              the tour that was postponed for 2 years due to the Covid pandemic
            </ResponsiveText>
            <ResponsiveText isMobile={isMobile}>
              Today the band is working on the third studio album which will see
              the light of day in the early 2023
            </ResponsiveText>
            <ResponsiveText isMobile={isMobile}>
              Thrash Till Death!
            </ResponsiveText>
          </CardContent>
        </Card>
      </Wrapper>
    </Container>
  );
};

export default About;
