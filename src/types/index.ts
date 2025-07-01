export type Movie = {
  id: number;
  title: string;
  original_title: string;
  overview: string;
  release_date: string;
  genre_names: string[];
  poster_url: string;
  backdrop_url: string;
  popularity: number;
  vote_average: number;
  vote_count: number;
  original_language: string;
  adult: boolean;
  video: boolean;
};

export type TVShow = {
  id: number;
  name: string;
  original_name: string;
  overview: string;
  first_air_date: string;
  genre_names: string[];
  poster_url: string;
  backdrop_url: string;
  popularity: number;
  vote_average: number;
  vote_count: number;
  original_language: string;
  origin_country: string[];
  adult: boolean;
};