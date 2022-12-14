import { useMutation } from "react-query";

import { LoginCredentials } from "../../api/types";
import apiClient from "../../api/apiClient";

const useMutationLogin = () => {
  return useMutation<void, Error, LoginCredentials>(apiClient.login);
};

export default useMutationLogin;
