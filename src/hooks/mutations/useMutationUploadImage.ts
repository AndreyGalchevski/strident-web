import { useMutation } from "react-query";

import apiClient from "../../api/apiClient";

const useMutationUploadImage = () => {
  return useMutation<string, Error, FormData>(apiClient.uploadImage);
};

export default useMutationUploadImage;
