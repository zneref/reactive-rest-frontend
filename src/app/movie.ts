import { MovieInfo } from './movieinfo';

export class Movie {
  id: string;
  title: string;
  info: MovieInfo;

  constructor(id: string, title: string, info: MovieInfo) {
    this.id = id;
    this.title = title;
    this.info = info;
  }
}
