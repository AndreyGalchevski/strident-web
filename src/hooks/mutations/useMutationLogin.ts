import { useMutation } from "react-query";

import { LoginCredentials } from "../../api/types";
import { login } from "../../api/utils";
import { AUTH_KEY } from "../../utils/constants";

const useMutationLogin = () => {
  return useMutation<void, Error, LoginCredentials>(login, {
    onSuccess: () => {
      localStorage.setItem(AUTH_KEY, "true");
    },
  });
};

export default useMutationLogin;
