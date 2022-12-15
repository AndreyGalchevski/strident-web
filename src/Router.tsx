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
import ManageMember from "./pages/admin/ManageMember";
import ManageVideo from "./pages/admin/ManageVideo";
import ManageSong from "./pages/admin/ManageSong";
import ManageMerchandise from "./pages/admin/ManageMerchandise";
import ManageGig from "./pages/admin/ManageGig";
import ManageLyric from "./pages/admin/ManageLyric";
import useAuth from "./hooks/useAuth";
import useQueryVerifyAuth from "./hooks/queries/useQueryVerifyAuth";

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
          <Route
            key="new-member"
            path="/admin/members/new"
            element={<ManageMember />}
          />
          <Route
            key="edit-member"
            path="/admin/members/edit/:id"
            element={<ManageMember />}
          />
          <Route
            key="new-song"
            path="/admin/songs/new"
            element={<ManageSong />}
          />
          <Route
            key="edit-song"
            path="/admin/songs/edit/:id"
            element={<ManageSong />}
          />
          <Route
            key="new-video"
            path="/admin/videos/new"
            element={<ManageVideo />}
          />
          <Route
            key="edit-video"
            path="/admin/videos/edit/:id"
            element={<ManageVideo />}
          />
          <Route
            key="new-merch"
            path="/admin/merchandise/new"
            element={<ManageMerchandise />}
          />
          <Route
            key="edit-merch"
            path="/admin/merchandise/edit/:id"
            element={<ManageMerchandise />}
          />
          <Route key="new-gig" path="/admin/gigs/new" element={<ManageGig />} />
          <Route
            key="edit-gig"
            path="/admin/gigs/edit/:id"
            element={<ManageGig />}
          />
          <Route
            key="new-lyric"
            path="/admin/lyrics/new"
            element={<ManageLyric />}
          />
          <Route
            key="edit-lyric"
            path="/admin/lyrics/edit/:id"
            element={<ManageLyric />}
          />
        </>
      )}
    </Routes>
  );
};

export default observer(Router);
