import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Movie } from '../movie';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})

export class MoviesComponent implements OnInit {
  movies: Movie[] = [];

  constructor(private movieService: MovieService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
//    this.getMovies();
  }

  getMovies(): void {
    this.movieService.getMovies()
      .subscribe(movies => {
        this.movies = movies.slice();
        this.spinner.hide();
      },
      err => {
        this.spinner.hide();
      });
  }

  onClick() {
    this.spinner.show();
    this.getMovies();
   }
}
