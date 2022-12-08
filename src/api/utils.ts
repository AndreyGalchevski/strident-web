import { AUTH_TOKEN_NAME } from "../utils/constants";
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

export async function login(credentials: LoginCredentials): Promise<string> {
  const response = await fetch(`${baseURL}/auth/login`, {
    ...options,
    method: "POST",
    body: JSON.stringify(credentials),
  });

  const responseBody = await response.json();

  if (!response.ok) {
    throw Error(responseBody.error || GENERAL_ERROR);
  }

  return responseBody.data;
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
  const response = await fetch(`${baseURL}/${resourceName}`, options);
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

export async function createResource<T>(
  resourceName: ResourceName,
  data: T
): Promise<string> {
  const response = await fetch(`${baseURL}/${resourceName}`, {
    ...options,
    method: "POST",
    headers: {
      ...options.headers,
      Authorization: `Bearer ${localStorage.getItem(AUTH_TOKEN_NAME)}`,
    },
    body: JSON.stringify(data),
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
    headers: {
      ...options.headers,
      Authorization: `Bearer ${localStorage.getItem(AUTH_TOKEN_NAME)}`,
    },
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
    headers: {
      Authorization: `Bearer ${localStorage.getItem(AUTH_TOKEN_NAME)}`,
    },
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
      headers: {
        Authorization: `Bearer ${localStorage.getItem(AUTH_TOKEN_NAME)}`,
      },
      body: image,
    }
  );

  const responseBody = await response.json();

  if (!response.ok) {
    throw Error(responseBody.error || GENERAL_ERROR);
  }

  return responseBody.data;
}
