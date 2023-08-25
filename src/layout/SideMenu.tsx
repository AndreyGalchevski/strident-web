import { FunctionComponent } from "react";
import { slide as ReactBurgerMenu, Styles, State } from "react-burger-menu";
import { observer } from "mobx-react-lite";

import MenuItem from "./MenuItem";
import theme from "../utils/theme";
import useSideMenu from "../hooks/useSideMenu";
import { APP_ROOT_ID } from "../utils/constants";

const menuStyles: Partial<Styles> = {
  bmMenu: { background: theme.colors.darkGrey, paddingTop: "1em" },
  bmOverlay: { filter: "brightness(50%)", top: "8vh" },
  bmMenuWrap: { top: "8vh" },
};

interface Props {
  pageWrapID: string;
}

const SideMenu: FunctionComponent<Props> = ({ pageWrapID }) => {
  const sideMenu = useSideMenu();

  const handleMenuStateChange = ({ isOpen }: State) => {
    if (isOpen) {
      sideMenu.open();
    } else {
      sideMenu.close();
    }
  };

  const handleMenuClose = () => {
    sideMenu.close();
  };

  return (
    <ReactBurgerMenu
      isOpen={sideMenu.isOpen}
      styles={menuStyles}
      onStateChange={handleMenuStateChange}
      onClose={handleMenuClose}
      outerContainerId={APP_ROOT_ID}
      pageWrapId={pageWrapID}
      customBurgerIcon={false}
    >
      <MenuItem path="/" text="Home" onClick={handleMenuClose} />
      <MenuItem path="/members" text="Members" onClick={handleMenuClose} />
      <MenuItem path="/videos" text="Videos" onClick={handleMenuClose} />
      <MenuItem path="/music" text="Music" onClick={handleMenuClose} />
      <MenuItem path="/gigs" text="Gigs" onClick={handleMenuClose} />
      <MenuItem path="/merchandise" text="Merch" onClick={handleMenuClose} />
      <MenuItem path="/lyrics" text="Lyrics" onClick={handleMenuClose} />
      <MenuItem path="/about" text="About" onClick={handleMenuClose} />
    </ReactBurgerMenu>
  );
};

export default observer(SideMenu);
