import { useMutation, useQueryClient } from "react-query";

import { deleteResource, DeleteResourceParams } from "../../api/utils";
import { resourcesListQueryKey } from "../../utils/queryKeys";

const useMutationDeleteResource = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, DeleteResourceParams>(deleteResource, {
    onSuccess: (_, { resourceName }) => {
      queryClient.invalidateQueries(resourcesListQueryKey(resourceName));
    },
  });
};

export default useMutationDeleteResource;
