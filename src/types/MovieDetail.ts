export interface MovieDetail {
  backdrop_path: string | null,
  cast: string[],
  genres: {
    id: number,
    name: string,
  }[],
  id: number,
  overview: string | null,
  popularity: number,
  release_date: string, // format: date
  runtime: number | null,
  similar: {
    backdrop_path: string | null,
    id: number,
    title: string,
    overview: string | null,
    popularity: number,
    release_date: string,
    runtime: number,
    tagline: string | null,
  }[],
  title: string,
  video: boolean,
  vote_average: number,
  vote_count: number,
}