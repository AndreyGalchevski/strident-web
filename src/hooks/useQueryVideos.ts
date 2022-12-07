import { useQuery, UseQueryOptions, UseQueryResult } from "react-query";

import { Video } from "../api/types";
import { fetchResources } from "../api/utils";
import { videosQueryKey } from "../utils/queryKeys";

const useQueryVideos = (
  options: UseQueryOptions<Video[], Error, Video[]> = {}
): UseQueryResult<Video[], Error> =>
  useQuery<Video[], Error>({
    queryKey: videosQueryKey(),
    queryFn: () => fetchResources("videos"),
    ...options,
  });

export default useQueryVideos;
