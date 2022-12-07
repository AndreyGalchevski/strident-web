import { useQuery, UseQueryOptions, UseQueryResult } from "react-query";

import { Member } from "../api/types";
import { fetchResources } from "../api/utils";
import { membersQueryKey } from "../utils/queryKeys";

const useQueryMembers = (
  options: UseQueryOptions<Member[], Error, Member[]> = {}
): UseQueryResult<Member[], Error> =>
  useQuery<Member[], Error>({
    queryKey: membersQueryKey(),
    queryFn: () => fetchResources("members"),
    ...options,
  });

export default useQueryMembers;
