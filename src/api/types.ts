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

export interface Song extends Record<string, unknown> {
  id: string;
  name: string;
  album: string;
  url: string;
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
  imageNG: string;
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
