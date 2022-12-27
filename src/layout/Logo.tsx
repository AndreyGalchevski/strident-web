import { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const LogoImage = styled.img({
  height: "90%",
});

const Logo: FunctionComponent = () => (
  <Link to="/">
    <LogoImage
      src="https://res.cloudinary.com/dqvimfd8b/image/upload/v1570799435/strident/static/20191011_160907.png"
      alt=""
    />
  </Link>
);

export default Logo;
