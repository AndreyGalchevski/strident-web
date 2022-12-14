import { useQuery, UseQueryOptions, UseQueryResult } from "react-query";

import apiClient, { Resource, ResourceName } from "../../api/apiClient";
import { resourceQueryKey } from "../../utils/queryKeys";

const useQueryResources = <T extends ResourceName>(
  resourceName: T,
  options: UseQueryOptions<Resource<T>[], Error, Resource<T>[]> = {}
): UseQueryResult<Resource<T>[], Error> =>
  useQuery<Resource<T>[], Error>({
    queryKey: resourceQueryKey(resourceName),
    queryFn: () => apiClient.fetchResources(resourceName),
    ...options,
  });

export default useQueryResources;
