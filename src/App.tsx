import { FunctionComponent, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import styled from "@emotion/styled";

import decodeJWT from "./utils/jwt";
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
import Navbar from "./layout/Navbar";
import Footer from "./layout/Footer";
import { AuthProvider } from "./context/authContext";
import { QueryClient, QueryClientProvider } from "react-query";

const Main = styled.main({
  overflowY: "scroll",
  height: "100%",
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: Infinity,
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

const App: FunctionComponent = () => {
  useEffect(() => {
    const token = localStorage.getItem("stridentToken");
    if (token) {
      const decodedData = decodeJWT(token);
      const currentTime = Date.now() / 1000;
      if (decodedData.exp < currentTime) {
        localStorage.removeItem("stridentToken");
        window.location.href = "/login";
      }
    }
  }, []);

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Navbar />
          <Main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/members" element={<Members />} />
              <Route path="/songs" element={<Songs />} />
              <Route path="/videos" element={<Videos />} />
              <Route path="/merch" element={<Merchandises />} />
              <Route path="/gigs" element={<Gigs />} />
              <Route path="/lyrics" element={<Lyrics />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login />} />
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
                path="/admin/merch/new"
                element={<ManageMerchandise />}
              />
              <Route
                key="edit-merch"
                path="/admin/merch/edit/:id"
                element={<ManageMerchandise />}
              />
              <Route
                key="new-gig"
                path="/admin/gigs/new"
                element={<ManageGig />}
              />
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
            </Routes>
          </Main>
          <Footer />
        </AuthProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

export default App;
