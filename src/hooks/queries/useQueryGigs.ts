import { useQuery, UseQueryOptions, UseQueryResult } from "react-query";

import { Gig } from "../../api/types";
import { fetchResources } from "../../api/utils";
import { gigsQueryKey } from "../../utils/queryKeys";

const useQueryGigs = (
  options: UseQueryOptions<Gig[], Error, Gig[]> = {}
): UseQueryResult<Gig[], Error> =>
  useQuery<Gig[], Error>({
    queryKey: gigsQueryKey(),
    queryFn: () => fetchResources("gigs"),
    ...options,
  });

export default useQueryGigs;
