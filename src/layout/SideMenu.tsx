import { FunctionComponent } from "react";
import styled from "styled-components";

import MenuItem from "./MenuItem";

const Wrapper = styled.div(({ theme: { colors } }) => ({
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  backgroundColor: colors.black,
  paddingTop: 20,
}));

const MenuImage = styled.img({
  marginTop: "3vh",
  width: "65vw",
  height: "40vh",
});

const menuItemStyle = {
  margin: 8,
};

interface Props {
  onClose: () => void;
}

const SideMenu: FunctionComponent<Props> = ({ onClose }) => (
  <Wrapper>
    <MenuItem path="/" text="Home" onClick={onClose} style={menuItemStyle} />
    <MenuItem
      path="/members"
      text="Members"
      onClick={onClose}
      style={menuItemStyle}
    />
    <MenuItem
      path="/videos"
      text="Videos"
      onClick={onClose}
      style={menuItemStyle}
    />
    <MenuItem
      path="/songs"
      text="Songs"
      onClick={onClose}
      style={menuItemStyle}
    />
    <MenuItem
      path="/gigs"
      text="Gigs"
      onClick={onClose}
      style={menuItemStyle}
    />
    <MenuItem
      path="/merchandise"
      text="Merch"
      onClick={onClose}
      style={menuItemStyle}
    />
    <MenuItem
      path="/lyrics"
      text="Lyrics"
      onClick={onClose}
      style={menuItemStyle}
    />
    <MenuItem
      path="/about"
      text="About"
      onClick={onClose}
      style={menuItemStyle}
    />
    <picture>
      <source
        srcSet="https://res.cloudinary.com/dqvimfd8b/image/upload/v1571164676/strident/static/sidenav_ng.webp"
        type="image/webp"
      />
      <source
        srcSet="https://res.cloudinary.com/dqvimfd8b/image/upload/v1571164625/strident/static/sidenav.png"
        type="image/jpeg"
      />
      <MenuImage
        src="https://res.cloudinary.com/dqvimfd8b/image/upload/v1571164625/strident/static/sidenav.png"
        alt=""
      />
    </picture>
  </Wrapper>
);

export default SideMenu;
