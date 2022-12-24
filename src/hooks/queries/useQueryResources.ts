import { useQuery, UseQueryOptions, UseQueryResult } from "react-query";

import apiClient from "../../api/apiClient";
import { Resource, ResourceName } from "../../api/types";
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
