import { ResourceName } from "../api/types";

const keyPrefix = "strident";

export const authVerificationQueryKey = () => [
  keyPrefix,
  "auth",
  "verification",
];

export const resourcesQueryKey = (resourceName: ResourceName) => [
  keyPrefix,
  resourceName,
];

export const singleResourceQueryKey = (
  resourceName: ResourceName,
  resourceID: string
) => [keyPrefix, resourceName, resourceID];
