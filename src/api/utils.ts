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

const options = {
  headers: {
    "Content-Type": "application/json",
  },
};

export async function login(credentials: LoginCredentials): Promise<void> {
  const response = await fetch(`${baseURL}/auth/login`, {
    ...options,
    method: "POST",
    body: JSON.stringify(credentials),
    credentials: "include",
  });

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

type Resource<T> = T extends "gigs"
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

export async function fetchResources<T extends ResourceName>(
  resourceName: T
): Promise<Resource<T>[]> {
  const response = await fetch(`${baseURL}/${resourceName}`, {
    ...options,
    credentials: "include",
  });
  const responseBody = await response.json();

  if (!response.ok) {
    throw Error(responseBody.error || GENERAL_ERROR);
  }

  return responseBody.data;
}

export async function fetchResource<T extends ResourceName>(
  resourceName: T,
  resourceID: string
): Promise<Resource<T>> {
  const response = await fetch(`${baseURL}/${resourceName}/${resourceID}`, {
    ...options,
    credentials: "include",
  });
  const responseBody = await response.json();

  if (!response.ok) {
    throw Error(responseBody.error || GENERAL_ERROR);
  }

  return responseBody.data;
}

export async function createResource<T>(
  resourceName: ResourceName,
  data: T
): Promise<string> {
  const response = await fetch(`${baseURL}/${resourceName}`, {
    ...options,
    method: "POST",
    body: JSON.stringify(data),
    credentials: "include",
  });

  const responseBody = await response.json();

  if (!response.ok) {
    throw Error(responseBody.error || GENERAL_ERROR);
  }

  return responseBody.data;
}

export async function updateResource<T>(
  resourceName: ResourceName,
  resourceID: string,
  data: T
): Promise<string> {
  const response = await fetch(`${baseURL}/${resourceName}/${resourceID}`, {
    ...options,
    method: "PUT",
    credentials: "include",
    body: JSON.stringify(data),
  });

  const responseBody = await response.json();

  if (!response.ok) {
    throw Error(responseBody.error || GENERAL_ERROR);
  }

  return responseBody.data;
}

export interface DeleteResourceParams {
  resourceName: ResourceName;
  resourceID: string;
}

export async function deleteResource({
  resourceName,
  resourceID,
}: DeleteResourceParams): Promise<void> {
  const response = await fetch(`${baseURL}/${resourceName}/${resourceID}`, {
    ...options,
    method: "DELETE",
    credentials: "include",
  });

  const responseBody = await response.json();

  if (!response.ok) {
    throw Error(responseBody.error || GENERAL_ERROR);
  }
}

interface ImageUploadResponse {
  imageURL: string;
  ngImageURL: string;
}

export async function uploadImage(
  folderName: string,
  fileName: string,
  image: FormData
): Promise<ImageUploadResponse> {
  const response = await fetch(
    `${baseURL}/images?folderName=${folderName}&fileName=${fileName}`,
    {
      method: "POST",
      credentials: "include",
      body: image,
    }
  );

  const responseBody = await response.json();

  if (!response.ok) {
    throw Error(responseBody.error || GENERAL_ERROR);
  }

  return responseBody.data;
}
