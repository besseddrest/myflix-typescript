export interface MovieDetail {
  backdrop_path: string | null,
  genres: {
    id: number,
    name: string,
  }[],
  id: number,
  overview: string | null,
  popularity: number,
  release_date: string, // format: date
  runtime: number | null,
  title: string,
  video: boolean,
  vote_average: number,
  vote_count: number,
}