import { useQuery, UseQueryOptions, UseQueryResult } from "react-query";

import apiClient, { Resource, ResourceName } from "../../api/apiClient";
import { resourcesQueryKey } from "../../utils/queryKeys";

const useQueryResources = <T extends ResourceName>(
  resourceName: T,
  options: UseQueryOptions<Resource<T>[], Error, Resource<T>[]> = {}
): UseQueryResult<Resource<T>[], Error> =>
  useQuery<Resource<T>[], Error>({
    queryKey: resourcesQueryKey(resourceName),
    queryFn: () => apiClient.fetchResources(resourceName),
    ...options,
  });

export default useQueryResources;
