import { useQuery, UseQueryOptions, UseQueryResult } from "react-query";

import apiClient, { Resource, ResourceName } from "../../api/apiClient";
import { singleResourceQueryKey } from "../../utils/queryKeys";

const useQuerySingleResource = <T extends ResourceName>(
  resourceName: T,
  resourceID?: string,
  options: UseQueryOptions<Resource<T>, Error, Resource<T>> = {}
): UseQueryResult<Resource<T>, Error> =>
  useQuery<Resource<T>, Error>({
    queryKey: singleResourceQueryKey(resourceName, resourceID!),
    queryFn: () => apiClient.fetchSingleResource(resourceName, resourceID!),
    ...options,
  });

export default useQuerySingleResource;
