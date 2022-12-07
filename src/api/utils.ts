import { Credentials, LoginResponse } from "./types";

const baseURL = process.env.API_URL;

const options = {
  headers: {
    "Content-Type": "application/json",
  },
};

export async function login(creds: Credentials): Promise<LoginResponse> {
  const response = await fetch(`${baseURL}/auth/login`, {
    ...options,
    method: "POST",
    body: JSON.stringify(creds),
  });

  if (response.status >= 400) {
    switch (response.status) {
      case 404:
        throw new Error("User not found");
      case 400:
        throw new Error("Wrong credentials");
      default:
        throw new Error("Something went wrong");
    }
  }
  const { token } = await response.json();
  return token;
}

export async function fetchResources<T>(resourceName: string): Promise<T[]> {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/${resourceName}`,
    options
  );
  const responseBody = await response.json();
  return responseBody.data;
}

export async function fetchResource<T>(
  resourceName: string,
  resourceId: string
): Promise<T> {
  const response = await fetch(
    `${baseURL}/${resourceName}/${resourceId}`,
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
      Authorization: `Bearer ${localStorage.getItem("stridentToken")}`,
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
  resourceId: string,
  data: T
): Promise<string> {
  const response = await fetch(`${baseURL}/${resourceName}/${resourceId}`, {
    ...options,
    method: "PUT",
    headers: {
      ...options.headers,
      Authorization: `Bearer ${localStorage.getItem("stridentToken")}`,
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
  resourceId: string
): Promise<string> {
  const response = await fetch(`${baseURL}/${resourceName}/${resourceId}`, {
    ...options,
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("stridentToken")}`,
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
        Authorization: `Bearer ${localStorage.getItem("stridentToken")}`,
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
