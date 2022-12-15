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
import useAuth from "./hooks/useAuth";
import useQueryVerifyAuth from "./hooks/queries/useQueryVerifyAuth";
import GigCreate from "./pages/admin/GigCreate";
import GigEdit from "./pages/admin/GigEdit";
import LyricCreate from "./pages/admin/LyricCreate";
import LyricEdit from "./pages/admin/LyricEdit";

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
