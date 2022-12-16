import { Route, Routes, useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";

import Home from "./pages/Home";
import Members from "./pages/Members";
import Videos from "./pages/Videos";
import Songs from "./pages/Songs";
import Merchandises from "./pages/Merchandises";
import Gigs from "./pages/Gigs";
import Lyrics from "./pages/Lyrics";
import About from "./pages/About";
import Login from "./pages/Login";
import useAuth from "./hooks/useAuth";
import useQueryVerifyAuth from "./hooks/queries/useQueryVerifyAuth";
import GigCreate from "./pages/admin/GigCreate";
import GigEdit from "./pages/admin/GigEdit";
import LyricCreate from "./pages/admin/LyricCreate";
import LyricEdit from "./pages/admin/LyricEdit";
import MemberCreate from "./pages/admin/MemberCreate";
import MemberEdit from "./pages/admin/MemberEdit";
import MerchandiseCreate from "./pages/admin/MerchandiseCreate";
import MerchandiseEdit from "./pages/admin/MerchandiseEdit";
import SongCreate from "./pages/admin/SongCreate";
import SongEdit from "./pages/admin/SongEdit";
import VideoEdit from "./pages/admin/VideoEdit";
import VideoCreate from "./pages/admin/VideoCreate";

const Router = () => {
  const navigate = useNavigate();

  const auth = useAuth();

  const { isError: isVerifyAuthError } = useQueryVerifyAuth({
    enabled: auth.isAuthenticated,
  });

  useEffect(() => {
    if (auth.isAuthenticated && isVerifyAuthError) {
      auth.invalidate();
      navigate("/login");
    }
  }, [isVerifyAuthError, navigate, auth]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/members" element={<Members />} />
      <Route path="/songs" element={<Songs />} />
      <Route path="/videos" element={<Videos />} />
      <Route path="/merchandise" element={<Merchandises />} />
      <Route path="/gigs" element={<Gigs />} />
      <Route path="/lyrics" element={<Lyrics />} />
      <Route path="/about" element={<About />} />
      <Route path="/login" element={<Login />} />
      {auth.isAuthenticated && (
        <>
          <Route path="/admin/members/new" element={<MemberCreate />} />
          <Route path="/admin/members/edit/:id" element={<MemberEdit />} />
          <Route
            key="new-song"
            path="/admin/songs/new"
            element={<SongCreate />}
          />
          <Route
            key="edit-song"
            path="/admin/songs/edit/:id"
            element={<SongEdit />}
          />
          <Route
            key="new-video"
            path="/admin/videos/new"
            element={<VideoCreate />}
          />
          <Route
            key="edit-video"
            path="/admin/videos/edit/:id"
            element={<VideoEdit />}
          />
          <Route
            path="/admin/merchandise/new"
            element={<MerchandiseCreate />}
          />
          <Route
            path="/admin/merchandise/edit/:id"
            element={<MerchandiseEdit />}
          />
          <Route path="/admin/gigs/new" element={<GigCreate />} />
          <Route path="/admin/gigs/edit/:id" element={<GigEdit />} />
          <Route path="/admin/lyrics/new" element={<LyricCreate />} />
          <Route path="/admin/lyrics/edit/:id" element={<LyricEdit />} />
        </>
      )}
    </Routes>
  );
};

export default observer(Router);
