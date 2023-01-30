import { Movie } from "./Movie";

export interface MovieLists {
  [key: string]: Movie[],
}