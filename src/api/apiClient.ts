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

export interface CreateResourceParams<T> {
  resourceName: T;
  data: Resource<T>;
}

async function createResource<T extends ResourceName>({
  resourceName,
  data,
}: CreateResourceParams<T>): Promise<string> {
  const response = await fetch(`${baseURL}/${resourceName}`, {
    ...options,
    method: "POST",
    body: JSON.stringify(data),
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
}

async function updateResource<T extends ResourceName>({
  resourceID,
  resourceName,
  data,
}: UpdateResourceParams<T>): Promise<void> {
  const response = await fetch(`${baseURL}/${resourceName}/${resourceID}`, {
    ...options,
    method: "PATCH",
    body: JSON.stringify(data),
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

async function uploadImage(formData: FormData): Promise<string> {
  const response = await fetch(`${baseURL}/images`, {
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

const apiClient = {
  login,
  verifyAuth,
  fetchResources,
  fetchSingleResource,
  createResource,
  updateResource,
  deleteResource,
  uploadImage,
};

export default apiClient;
