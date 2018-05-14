import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Movie } from '../movie';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-search-first',
  templateUrl: './search-first.component.html',
  styleUrls: ['./search-first.component.css']
})
export class SearchFirstComponent implements OnInit {
  movie: Movie;

  constructor(private movieService: MovieService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
//    this.getMovies();
  }

  getMovie(query: string): void {
    this.movieService.searchFirstMovie(query)
      .subscribe(movie => {
        this.movie = movie;
        this.spinner.hide();
      }, err => {
        this.spinner.hide();
      });
  }

  onEnter(query: string) {
    this.spinner.show();
     this.getMovie(query);
    }
}
