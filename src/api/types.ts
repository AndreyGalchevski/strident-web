export interface LoginCredentials {
  email: string;
  password: string;
}

export interface TokenClaims {
  userID: string;
  exp: number;
}

export interface Member extends Record<string, unknown> {
  id: string;
  name: string;
  instrument: string;
  image: string;
}

export interface Album extends Record<string, unknown> {
  id: string;
  name: string;
  url: string;
  year: number;
}

export interface Video extends Record<string, unknown> {
  id: string;
  name: string;
  url: string;
}

export interface Merchandise extends Record<string, unknown> {
  id: string;
  name: string;
  type: string;
  price: number;
  url: string;
  image: string;
}

export interface Gig extends Record<string, unknown> {
  id: string;
  name: string;
  venue: string;
  address: string;
  city: string;
  date: Date;
  fbEvent: string;
  image: string;
}

export interface Lyric extends Record<string, unknown> {
  id: string;
  name: string;
  text: string;
}

export type ResourceName =
  | "albums"
  | "gigs"
  | "lyrics"
  | "members"
  | "merchandise"
  | "albums"
  | "videos";

export type Resource<T> = T extends "gigs"
  ? Gig
  : T extends "lyrics"
  ? Lyric
  : T extends "members"
  ? Member
  : T extends "merchandise"
  ? Merchandise
  : T extends "albums"
  ? Album
  : T extends "videos"
  ? Video
  : never;

export type GigFormData = Pick<
  Gig,
  "name" | "venue" | "address" | "city" | "date" | "fbEvent"
>;

export type LyricFormData = Pick<Lyric, "name" | "text">;

export type MemberFormData = Pick<Member, "name" | "instrument">;

export type MerchandiseFormData = Pick<
  Merchandise,
  "name" | "type" | "price" | "url"
>;

export type AlbumFormData = Pick<Album, "name" | "url" | "year">;

export type VideoFormData = Pick<Video, "name" | "url">;

export type ResourceFormData<T> = T extends "gigs"
  ? GigFormData
  : T extends "lyrics"
  ? LyricFormData
  : T extends "members"
  ? MemberFormData
  : T extends "merchandise"
  ? MerchandiseFormData
  : T extends "albums"
  ? AlbumFormData
  : T extends "videos"
  ? VideoFormData
  : never;
