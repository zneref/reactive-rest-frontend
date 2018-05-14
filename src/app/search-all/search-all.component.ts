import { Component, OnInit } from '@angular/core';
import { Movie } from '../movie';
import { MovieService } from '../movie.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-search-all',
  templateUrl: './search-all.component.html',
  styleUrls: ['./search-all.component.css']
})
export class SearchAllComponent implements OnInit {
  movies: Movie[] = [];

  constructor(private movieService: MovieService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
//    this.getMovies();
  }

  getMovies(query: string): void {
    this.movieService.searchMovies(query)
      .subscribe(movies => {
        this.movies = movies.slice();
        this.spinner.hide();
      }, err => {
        this.spinner.hide();
      });
  }

   onEnter(query: string) {
     this.spinner.show();
     this.getMovies(query);
    }
}
