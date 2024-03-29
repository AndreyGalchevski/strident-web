import { Route, Routes } from "react-router-dom";

import GigCreate from "./GigCreate";
import GigEdit from "./GigEdit";
import LyricCreate from "./LyricCreate";
import LyricEdit from "./LyricEdit";
import MemberCreate from "./MemberCreate";
import MemberEdit from "./MemberEdit";
import MerchandiseCreate from "./MerchandiseCreate";
import MerchandiseEdit from "./MerchandiseEdit";
import AlbumCreate from "./AlbumCreate";
import AlbumEdit from "./AlbumEdit";
import VideoEdit from "./VideoEdit";
import VideoCreate from "./VideoCreate";

const AdminRouter = () => {
  return (
    <Routes>
      <Route path="/members/create" element={<MemberCreate />} />
      <Route path="/members/edit/:id" element={<MemberEdit />} />
      <Route path="/music/create" element={<AlbumCreate />} />
      <Route path="/music/edit/:id" element={<AlbumEdit />} />
      <Route path="/videos/create" element={<VideoCreate />} />
      <Route path="/videos/edit/:id" element={<VideoEdit />} />
      <Route path="/merchandise/create" element={<MerchandiseCreate />} />
      <Route path="/merchandise/edit/:id" element={<MerchandiseEdit />} />
      <Route path="/gigs/create" element={<GigCreate />} />
      <Route path="/gigs/edit/:id" element={<GigEdit />} />
      <Route path="/lyrics/create" element={<LyricCreate />} />
      <Route path="/lyrics/edit/:id" element={<LyricEdit />} />
    </Routes>
  );
};

export default AdminRouter;
