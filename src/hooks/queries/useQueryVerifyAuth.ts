import { useQuery, UseQueryOptions, UseQueryResult } from "react-query";

import apiClient from "../../api/apiClient";
import { authVerificationQueryKey } from "../../utils/queryKeys";

const THIRTY_SECONDS_MS = 30000;

const useQueryVerifyAuth = (
  options: UseQueryOptions<void, Error, void> = {}
): UseQueryResult<void, Error> =>
  useQuery<void, Error>({
    queryKey: authVerificationQueryKey(),
    queryFn: () => apiClient.verifyAuth(),
    refetchInterval: THIRTY_SECONDS_MS,
    refetchIntervalInBackground: true,
    ...options,
  });

export default useQueryVerifyAuth;
