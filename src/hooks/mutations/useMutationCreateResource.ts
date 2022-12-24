import { useMutation, useQueryClient } from "react-query";

import apiClient, { CreateResourceParams } from "../../api/apiClient";
import { ResourceName } from "../../api/types";
import { resourcesQueryKey } from "../../utils/queryKeys";

const useMutationCreateResource = <T extends ResourceName>() => {
  const queryClient = useQueryClient();

  return useMutation<string, Error, CreateResourceParams<T>>(
    apiClient.createResource,
    {
      onSuccess: (_, { resourceName }) => {
        queryClient.invalidateQueries(resourcesQueryKey(resourceName));
      },
    }
  );
};

export default useMutationCreateResource;
