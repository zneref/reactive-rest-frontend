import { Component, OnInit } from '@angular/core';
import { Movie } from '../movie';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-search-first',
  templateUrl: './search-first.component.html',
  styleUrls: ['./search-first.component.css']
})
export class SearchFirstComponent implements OnInit {
  movie: Movie;

  constructor(private movieService: MovieService) { }

  ngOnInit() {
//    this.getMovies();
  }

  getMovie(query: string): void {
    this.movieService.searchFirstMovie(query)
      .subscribe(movie => this.movie = movie);
  }

  onEnter(query: string) {
     this.getMovie(query);
    }
}
