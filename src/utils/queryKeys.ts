import { ResourceName } from "../api/utils";

const keyPrefix = "strident";

export const authVerificationQueryKey = () => [
  keyPrefix,
  "auth",
  "verification",
];

export const resourcesListQueryKey = (resourceName: ResourceName) => [
  keyPrefix,
  resourceName,
];

export const resourceQueryKey = (
  resourceName: ResourceName,
  resourceID: string
) => [keyPrefix, resourceName, resourceID];
