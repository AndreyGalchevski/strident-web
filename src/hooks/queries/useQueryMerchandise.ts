import { useQuery, UseQueryOptions, UseQueryResult } from "react-query";

import { Merchandise } from "../../api/types";
import { fetchResources } from "../../api/utils";
import { resourcesListQueryKey } from "../../utils/queryKeys";

const useQueryMerchandise = (
  options: UseQueryOptions<Merchandise[], Error, Merchandise[]> = {}
): UseQueryResult<Merchandise[], Error> =>
  useQuery<Merchandise[], Error>({
    queryKey: resourcesListQueryKey("merchandise"),
    queryFn: () => fetchResources("merchandise"),
    ...options,
  });

export default useQueryMerchandise;
