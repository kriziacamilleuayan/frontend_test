export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
};

export type Pokemon = {
  id: string;
  isPokemon: boolean;
  name: string;
  height: number;
  weight: number;
  baseExperience: number;
  image: string;
  stats : Stats[];
  types: string[];
};

export type Stats = {
  name: string;
  value: number;
};

export type Address = {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
};

export type Company = {
  name: string;
  catchPhrase: string;
  bs: string;
};

export type Geo = {
  lat: string;
  lng: string;
};
