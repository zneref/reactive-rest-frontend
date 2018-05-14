import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';

import { Movie } from '../movie';
import { MovieService }  from '../movie.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {

 @Input() movie: Movie;

  constructor(private route: ActivatedRoute,
  private movieService: MovieService,
  private location: Location,
  private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.spinner.show();
    this.getMovie();
  }

  getMovie(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.movieService.getMovie(id)
      .subscribe(movie => {
        this.movie = movie;
        this.spinner.hide();
      }, err => {
        this.spinner.hide();
      });
  }

  goBack(): void {
  this.location.back();
  }
}
