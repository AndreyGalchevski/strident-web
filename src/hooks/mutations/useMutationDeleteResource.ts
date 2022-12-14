import { useMutation, useQueryClient } from "react-query";

import apiClient, { DeleteResourceParams } from "../../api/apiClient";
import { resourcesQueryKey } from "../../utils/queryKeys";

const useMutationDeleteResource = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, DeleteResourceParams>(
    apiClient.deleteResource,
    {
      onSuccess: (_, { resourceName }) => {
        queryClient.invalidateQueries(resourcesQueryKey(resourceName));
      },
    }
  );
};

export default useMutationDeleteResource;
