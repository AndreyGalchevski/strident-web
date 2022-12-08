import { useQuery, UseQueryOptions, UseQueryResult } from "react-query";

import { Member } from "../../api/types";
import { fetchResources } from "../../api/utils";
import { resourcesListQueryKey } from "../../utils/queryKeys";

const useQueryMembers = (
  options: UseQueryOptions<Member[], Error, Member[]> = {}
): UseQueryResult<Member[], Error> =>
  useQuery<Member[], Error>({
    queryKey: resourcesListQueryKey("members"),
    queryFn: () => fetchResources("members"),
    ...options,
  });

export default useQueryMembers;
