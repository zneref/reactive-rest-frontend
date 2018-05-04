export class MovieInfo {
  directors: string;
  release_date: string;
  rating: number;
  genres: string[];
  image_url: string;
  plot: string;
  rank: number;
  running_time_secs: number;
  actors: string[]

  constructor(
    directors: string,
    release_date: string,
    rating: number,
    genres: string[],
    image_url: string,
    plot: string,
    rank: number,
    running_time_secs: number,
    actors: string[]
    ) {
      this.directors = directors;
      this.release_date = release_date;
      this.rating = rating;
      this.genres = genres;
      this.image_url = image_url;
      this.plot = plot;
      this.rank = rank;
      this.running_time_secs = running_time_secs;
      this.actors = actors;
    }
}
