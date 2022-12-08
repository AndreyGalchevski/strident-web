import { useQuery, UseQueryOptions, UseQueryResult } from "react-query";

import { Song } from "../../api/types";
import { fetchResources } from "../../api/utils";
import { resourcesListQueryKey } from "../../utils/queryKeys";

const useQuerySongs = (
  options: UseQueryOptions<Song[], Error, Song[]> = {}
): UseQueryResult<Song[], Error> =>
  useQuery<Song[], Error>({
    queryKey: resourcesListQueryKey("songs"),
    queryFn: () => fetchResources("songs"),
    ...options,
  });

export default useQuerySongs;
