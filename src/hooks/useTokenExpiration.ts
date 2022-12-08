import { useEffect } from "react";
import { AUTH_TOKEN_NAME } from "../utils/constants";

import decodeJWT from "../utils/jwt";

const useTokenExpiration = () => {
  useEffect(() => {
    const token = localStorage.getItem(AUTH_TOKEN_NAME);
    if (token) {
      const decodedData = decodeJWT(token);
      const currentTime = Date.now() / 1000;
      if (decodedData.exp < currentTime) {
        localStorage.removeItem(AUTH_TOKEN_NAME);
        window.location.href = "/login";
      }
    }
  }, []);
};

export default useTokenExpiration;
