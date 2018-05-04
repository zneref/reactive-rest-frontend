import { Component, OnInit } from '@angular/core';
import { Movie } from '../movie';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-search-all',
  templateUrl: './search-all.component.html',
  styleUrls: ['./search-all.component.css']
})
export class SearchAllComponent implements OnInit {
  movies: Movie[] = [];

  constructor(private movieService: MovieService) { }

  ngOnInit() {
//    this.getMovies();
  }

  getMovies(query: string): void {
    this.movieService.searchMovies(query)
      .subscribe(movies => this.movies = movies.slice());
  }

   onEnter(query: string) { this.getMovies(query); }
}
