import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";

import Home from "./pages/Home";
import Members from "./pages/Members";
import Videos from "./pages/Videos";
import Songs from "./pages/Songs";
import Merchandise from "./pages/Merchandise";
import Gigs from "./pages/Gigs";
import Lyrics from "./pages/Lyrics";
import About from "./pages/About";
import Login from "./pages/Login";
import useAuth from "./hooks/useAuth";
import useQueryVerifyAuth from "./hooks/queries/useQueryVerifyAuth";
import AdminRouter from "./pages/admin/AdminRouter";

const Router = () => {
  const navigate = useNavigate();

  const location = useLocation();

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

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/members" element={<Members />} />
      <Route path="/songs" element={<Songs />} />
      <Route path="/videos" element={<Videos />} />
      <Route path="/merchandise" element={<Merchandise />} />
      <Route path="/gigs" element={<Gigs />} />
      <Route path="/lyrics" element={<Lyrics />} />
      <Route path="/about" element={<About />} />
      <Route path="/login" element={<Login />} />
      {auth.isAuthenticated && (
        <Route path="/admin/*" element={<AdminRouter />} />
      )}
      <Route path="*" element={<Navigate replace to="/" />} />
    </Routes>
  );
};

export default observer(Router);
