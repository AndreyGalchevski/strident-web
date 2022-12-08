import { useQuery, UseQueryOptions, UseQueryResult } from "react-query";

import { Merchandise } from "../../api/types";
import { fetchResources } from "../../api/utils";
import { merchandiseQueryKey } from "../../utils/queryKeys";

const useQueryMerchandise = (
  options: UseQueryOptions<Merchandise[], Error, Merchandise[]> = {}
): UseQueryResult<Merchandise[], Error> =>
  useQuery<Merchandise[], Error>({
    queryKey: merchandiseQueryKey(),
    queryFn: () => fetchResources("merchandise"),
    ...options,
  });

export default useQueryMerchandise;
