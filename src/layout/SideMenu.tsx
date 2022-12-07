import { FunctionComponent } from "react";
import styled from "@emotion/styled";

import { COLORS } from "../utils/constants";
import MenuItem from "./MenuItem";

const Wrapper = styled.div({
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  backgroundColor: COLORS.BLACK,
  paddingTop: 20,
});

const MenuImage = styled.img({
  marginTop: "3vh",
  width: "65vw",
  height: "40vh",
});

const menuItemStyle = {
  color: COLORS.WHITE,
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
      path="/merch"
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
        srcSet="https://res.cloudinary.com/dqvimfd8b/image/upload/v1571164676/strident/app/sidenav_ng.webp"
        type="image/webp"
      />
      <source
        srcSet="https://res.cloudinary.com/dqvimfd8b/image/upload/v1571164625/strident/app/sidenav.png"
        type="image/jpeg"
      />
      <MenuImage
        src="https://res.cloudinary.com/dqvimfd8b/image/upload/v1571164625/strident/app/sidenav.png"
        alt=""
      />
    </picture>
  </Wrapper>
);

export default SideMenu;
