import { useMutation, useQueryClient } from "react-query";

import apiClient, {
  ResourceName,
  UpdateResourceParams,
} from "../../api/apiClient";
import {
  resourcesQueryKey,
  singleResourceQueryKey,
} from "../../utils/queryKeys";

const useMutationUpdateResource = <T extends ResourceName>() => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, UpdateResourceParams<T>>(
    apiClient.updateResource,
    {
      onSuccess: (_, { resourceName, resourceID }) => {
        queryClient.invalidateQueries(resourcesQueryKey(resourceName));
        queryClient.invalidateQueries(
          singleResourceQueryKey(resourceName, resourceID)
        );
      },
    }
  );
};

export default useMutationUpdateResource;
