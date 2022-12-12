import { useQuery, UseQueryOptions, UseQueryResult } from "react-query";

import { fetchSingleResource, Resource, ResourceName } from "../../api/utils";
import { singleResourceQueryKey } from "../../utils/queryKeys";

const useQuerySingleResource = <T extends ResourceName>(
  resourceName: T,
  resourceID?: string,
  options: UseQueryOptions<Resource<T>, Error, Resource<T>> = {}
): UseQueryResult<Resource<T>, Error> =>
  useQuery<Resource<T>, Error>({
    queryKey: singleResourceQueryKey(resourceName, resourceID!),
    queryFn: () => fetchSingleResource(resourceName, resourceID!),
    ...options,
  });

export default useQuerySingleResource;
