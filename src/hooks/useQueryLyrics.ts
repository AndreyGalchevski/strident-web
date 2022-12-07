import { useQuery, UseQueryOptions, UseQueryResult } from "react-query";

import { Lyric } from "../api/types";
import { fetchResources } from "../api/utils";
import { lyricsQueryKey } from "../utils/queryKeys";

const useQueryLyrics = (
  options: UseQueryOptions<Lyric[], Error, Lyric[]> = {}
): UseQueryResult<Lyric[], Error> =>
  useQuery<Lyric[], Error>({
    queryKey: lyricsQueryKey(),
    queryFn: () => fetchResources("lyrics"),
    ...options,
  });

export default useQueryLyrics;
