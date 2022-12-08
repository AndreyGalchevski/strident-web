import { useMutation } from "react-query";

import { LoginCredentials } from "../../api/types";
import { login } from "../../api/utils";
import { AUTH_TOKEN_NAME } from "../../utils/constants";

const useMutationLogin = () => {
  return useMutation<string, Error, LoginCredentials>(login, {
    onSuccess: (token) => {
      localStorage.setItem(AUTH_TOKEN_NAME, token);
    },
  });
};

export default useMutationLogin;
