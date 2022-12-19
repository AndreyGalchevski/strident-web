import { useContext } from "react";

import SideMenuContext from "../context/SideMenuContext";

const useSideMenu = () => {
  const context = useContext(SideMenuContext);
  if (context === undefined) {
    throw new Error("useSideMenu must be used within a SideMenuProvider");
  }
  return context;
};

export default useSideMenu;
