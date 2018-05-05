import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MoviesComponent }      from './movies/movies.component';
import { MovieDetailComponent }  from './movie-detail/movie-detail.component';
import { SearchAllComponent }  from './search-all/search-all.component';
import { SearchFirstComponent }  from './search-first/search-first.component';

const routes: Routes = [
  { path: '', redirectTo: 'search-first', pathMatch: 'full' },
  { path: 'detail/:id', component: MovieDetailComponent },
  { path: 'movies', component: MoviesComponent },
  { path: 'search-all', component: SearchAllComponent },
  { path: 'search-first', component: SearchFirstComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
