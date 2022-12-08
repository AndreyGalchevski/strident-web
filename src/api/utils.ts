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
  const resources = await response.json();
  return resources;
}

export async function createResource<T>(
  resourceName: string,
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

  switch (response.status) {
    case 200:
      return "Created Successfully";
    case 401:
      return "Not Authorized";
    case 422:
      return "Fill Out All The fields";
    case 500:
      return "Something Went Wrong";
    default:
      return "";
  }
}

export async function updateResource<T>(
  resourceName: string,
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

  switch (response.status) {
    case 200:
      return "Updated Successfully";
    case 401:
      return "Not Authorized";
    case 422:
      return "Fill Out All The Fields";
    case 500:
      return "Something Went Wrong";
    default:
      return "";
  }
}

export async function deleteResource(
  resourceName: string,
  resourceID: string
): Promise<string> {
  const response = await fetch(`${baseURL}/${resourceName}/${resourceID}`, {
    ...options,
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem(AUTH_TOKEN_NAME)}`,
    },
  });

  switch (response.status) {
    case 200:
      return "Deleted Successfully";
    case 401:
      return "Not Authorized";
    case 422:
      return "Fill Out All The Fields";
    case 500:
      return "Something Went Wrong";
    default:
      return "";
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

  if (response.status >= 400) {
    switch (response.status) {
      case 400:
        throw new Error("Choose exactly one image");
      case 401:
        throw new Error("Not Authorized");
      default:
        throw new Error("Something Went Wrong");
    }
  }

  const result: ImageUploadResponse = await response.json();
  return result;
}
