import { useMutation } from "react-query";

import { LoginCredentials } from "../../api/types";
import { login } from "../../api/utils";

const useMutationLogin = () => {
  return useMutation<void, Error, LoginCredentials>(login);
};

export default useMutationLogin;
