export interface HeroMovie {
  poster_path: string | null,
  adult: boolean,
  overview: string,
  release_date: string, // date
  genre_ids: number[],
  id: number,
  original_title: string,
  original_language: string,
  title: string,
  backdrop_path: string | null,
  popularity: number, // decimal
  runtime: number | null,
  vote_count: number,
  video: boolean,
  vote_average: number,
}