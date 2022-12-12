import { ResourceName } from "../api/utils";

const keyPrefix = "strident";

export const authVerificationQueryKey = () => [
  keyPrefix,
  "auth",
  "verification",
];

export const resourceQueryKey = (resourceName: ResourceName) => [
  keyPrefix,
  resourceName,
];

export const singleResourceQueryKey = (
  resourceName: ResourceName,
  resourceID: string
) => [keyPrefix, resourceName, resourceID];
