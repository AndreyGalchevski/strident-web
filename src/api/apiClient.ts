import { sleep } from "../utils/general";
import {
  Gig,
  LoginCredentials,
  Lyric,
  Member,
  Merchandise,
  Song,
  Video,
} from "./types";

const GENERAL_ERROR = "Something went wrong";

const baseURL = process.env.REACT_APP_API_URL;

const options: RequestInit = {
  headers: {
    "Content-Type": "application/json",
  },
  credentials: "include",
  mode: "cors",
};

async function login(credentials: LoginCredentials): Promise<void> {
  const response = await fetch(`${baseURL}/auth/login`, {
    ...options,
    method: "POST",
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    const responseBody = await response.json();
    throw Error(responseBody.error || GENERAL_ERROR);
  }

  await sleep(2000);
}

async function verifyAuth(): Promise<void> {
  const response = await fetch(`${baseURL}/auth/verify`, options);

  if (!response.ok) {
    const responseBody = await response.json();
    throw Error(responseBody.error || GENERAL_ERROR);
  }
}

export type ResourceName =
  | "gigs"
  | "lyrics"
  | "members"
  | "merchandise"
  | "songs"
  | "videos";

export type Resource<T> = T extends "gigs"
  ? Gig
  : T extends "lyrics"
  ? Lyric
  : T extends "members"
  ? Member
  : T extends "merchandise"
  ? Merchandise
  : T extends "songs"
  ? Song
  : T extends "videos"
  ? Video
  : never;

async function fetchResources<T extends ResourceName>(
  resourceName: T
): Promise<Resource<T>[]> {
  const response = await fetch(`${baseURL}/${resourceName}`, options);
  const responseBody = await response.json();

  if (!response.ok) {
    throw Error(responseBody.error || GENERAL_ERROR);
  }

  return responseBody.data;
}

async function fetchSingleResource<T extends ResourceName>(
  resourceName: T,
  resourceID: string
): Promise<Resource<T>> {
  const response = await fetch(
    `${baseURL}/${resourceName}/${resourceID}`,
    options
  );
  const responseBody = await response.json();

  if (!response.ok) {
    throw Error(responseBody.error || GENERAL_ERROR);
  }

  return responseBody.data;
}

const appendFormData = <T>(resource: Resource<T>, formData: FormData) => {
  (Object.keys(resource) as Array<keyof Resource<T>>).forEach((key) => {
    if (typeof resource[key] === "string") {
      formData.append(key as string, resource[key] as string);
    }
    if (typeof resource[key] === "number") {
      formData.append(key as string, (resource[key] as number).toString());
    }
    if (resource[key] instanceof Date) {
      formData.append(
        key as string,
        (resource[key] as Date).getTime().toString()
      );
    }
  });
};

export interface CreateResourceParams<T> {
  resourceName: T;
  data: Resource<T>;
  image?: File | null;
}

async function createResource<T extends ResourceName>({
  resourceName,
  data,
  image,
}: CreateResourceParams<T>): Promise<string> {
  const formData = new FormData();

  if (image) {
    formData.append("image", image);
    formData.append("folderName", resourceName);
  }

  appendFormData(data, formData);

  const response = await fetch(`${baseURL}/${resourceName}`, {
    ...options,
    headers: undefined,
    method: "POST",
    body: formData,
  });

  const responseBody = await response.json();

  if (!response.ok) {
    throw Error(responseBody.error || GENERAL_ERROR);
  }

  return responseBody.data;
}

export interface UpdateResourceParams<T> {
  resourceName: T;
  resourceID: string;
  data: Resource<T>;
  image?: File | null;
}

async function updateResource<T extends ResourceName>({
  resourceID,
  resourceName,
  data,
  image,
}: UpdateResourceParams<T>): Promise<void> {
  const formData = new FormData();

  if (image) {
    formData.append("image", image);
    formData.append("folderName", resourceName);
  }

  appendFormData(data, formData);

  const response = await fetch(`${baseURL}/${resourceName}/${resourceID}`, {
    ...options,
    headers: undefined,
    method: "PATCH",
    body: formData,
  });

  if (!response.ok) {
    const responseBody = await response.json();
    throw Error(responseBody.error || GENERAL_ERROR);
  }
}

export interface DeleteResourceParams {
  resourceName: ResourceName;
  resourceID: string;
}

async function deleteResource({
  resourceName,
  resourceID,
}: DeleteResourceParams): Promise<void> {
  const response = await fetch(`${baseURL}/${resourceName}/${resourceID}`, {
    ...options,
    method: "DELETE",
  });

  if (!response.ok) {
    const responseBody = await response.json();
    throw Error(responseBody.error || GENERAL_ERROR);
  }
}

const apiClient = {
  login,
  verifyAuth,
  fetchResources,
  fetchSingleResource,
  createResource,
  updateResource,
  deleteResource,
};

export default apiClient;
