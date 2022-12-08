import { useEffect } from "react";

import decodeJWT from "../utils/jwt";

const useTokenExpiration = () => {
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
};

export default useTokenExpiration;
