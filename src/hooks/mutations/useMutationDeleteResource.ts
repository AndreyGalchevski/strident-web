import { useMutation, useQueryClient } from "react-query";

import apiClient, { DeleteResourceParams } from "../../api/apiClient";
import { resourceQueryKey } from "../../utils/queryKeys";

const useMutationDeleteResource = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, DeleteResourceParams>(
    apiClient.deleteResource,
    {
      onSuccess: (_, { resourceName }) => {
        queryClient.invalidateQueries(resourceQueryKey(resourceName));
      },
    }
  );
};

export default useMutationDeleteResource;
