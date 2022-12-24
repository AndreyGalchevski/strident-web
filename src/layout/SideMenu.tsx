import { slide as ReactBurgerMenu, Styles, State } from "react-burger-menu";
import { observer } from "mobx-react-lite";

import MenuItem from "./MenuItem";
import theme from "../utils/theme";
import useSideMenu from "../hooks/useSideMenu";

const menuStyles: Partial<Styles> = {
  bmMenu: { background: theme.colors.darkGrey, paddingTop: "1em" },
  bmOverlay: { filter: "brightness(50%)" },
};

const SideMenu = () => {
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
      outerContainerId={"root"}
      pageWrapId={"main-app"}
      customBurgerIcon={false}
    >
      <MenuItem path="/" text="Home" onClick={handleMenuClose} />
      <MenuItem path="/members" text="Members" onClick={handleMenuClose} />
      <MenuItem path="/videos" text="Videos" onClick={handleMenuClose} />
      <MenuItem path="/songs" text="Songs" onClick={handleMenuClose} />
      <MenuItem path="/gigs" text="Gigs" onClick={handleMenuClose} />
      <MenuItem path="/merchandise" text="Merch" onClick={handleMenuClose} />
      <MenuItem path="/lyrics" text="Lyrics" onClick={handleMenuClose} />
      <MenuItem path="/about" text="About" onClick={handleMenuClose} />
    </ReactBurgerMenu>
  );
};

export default observer(SideMenu);
