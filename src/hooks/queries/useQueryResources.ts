import { useQuery, UseQueryOptions, UseQueryResult } from "react-query";

import { fetchResources, Resource, ResourceName } from "../../api/utils";
import { resourcesListQueryKey } from "../../utils/queryKeys";

const useQueryResources = <T extends ResourceName>(
  resourceName: T,
  options: UseQueryOptions<Resource<T>[], Error, Resource<T>[]> = {}
): UseQueryResult<Resource<T>[], Error> =>
  useQuery<Resource<T>[], Error>({
    queryKey: resourcesListQueryKey(resourceName),
    queryFn: () => fetchResources(resourceName),
    ...options,
  });

export default useQueryResources;
