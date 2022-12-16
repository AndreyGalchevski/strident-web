import { Route, Routes } from "react-router-dom";

import GigCreate from "./GigCreate";
import GigEdit from "./GigEdit";
import LyricCreate from "./LyricCreate";
import LyricEdit from "./LyricEdit";
import MemberCreate from "./MemberCreate";
import MemberEdit from "./MemberEdit";
import MerchandiseCreate from "./MerchandiseCreate";
import MerchandiseEdit from "./MerchandiseEdit";
import SongCreate from "./SongCreate";
import SongEdit from "./SongEdit";
import VideoEdit from "./VideoEdit";
import VideoCreate from "./VideoCreate";

const AdminRouter = () => {
  return (
    <Routes>
      <Route path="/members/new" element={<MemberCreate />} />
      <Route path="/members/edit/:id" element={<MemberEdit />} />
      <Route path="/songs/new" element={<SongCreate />} />
      <Route path="/songs/edit/:id" element={<SongEdit />} />
      <Route path="/videos/new" element={<VideoCreate />} />
      <Route path="/videos/edit/:id" element={<VideoEdit />} />
      <Route path="/merchandise/new" element={<MerchandiseCreate />} />
      <Route path="/merchandise/edit/:id" element={<MerchandiseEdit />} />
      <Route path="/gigs/new" element={<GigCreate />} />
      <Route path="/gigs/edit/:id" element={<GigEdit />} />
      <Route path="/lyrics/new" element={<LyricCreate />} />
      <Route path="/lyrics/edit/:id" element={<LyricEdit />} />
    </Routes>
  );
};

export default AdminRouter;