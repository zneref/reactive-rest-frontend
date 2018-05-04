import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { Movie } from './movie';
import { MessageService } from './message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'text/event-stream' })
};

@Injectable()
export class MovieService {

//  private moviesUrl = 'http://localhost:8080/v1/movies';  // URL to web api
  private moviesUrl = 'https://webflux-rest-app.herokuapp.com/v1/movies';  // URL to rest api deployed on heroku

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.moviesUrl)
      .pipe(
        tap(movies => this.log(`fetched movies`)),
        catchError(this.handleError('getMovies', []))
      );
  }

  /** GET movie by id. Will 404 if id not found */
  getMovie(id: string): Observable<Movie> {
    const url = `${this.moviesUrl}/${id}`;
    return this.http.get<Movie>(url).pipe(
      tap(_ => this.log(`fetched movie id=${id}`)),
      catchError(this.handleError<Movie>(`getMovie id=${id}`))
    );
  }

  /* GET movies whose title contains search term */
  searchMovies(query: string): Observable<Movie[]> {
    const url = `${this.moviesUrl}/all?q=${query}`;
    if (!query.trim()) {
      // if not search term, return empty array.
      return of([]);
    }
    return this.http.get<Movie[]>(url).pipe(
      tap(_ => this.log(`found movies matching "${query}"`)),
      catchError(this.handleError<Movie[]>('searchMovies', []))
    );
  }

  /* GET first movie which title contains search term */
  searchFirstMovie(query: string): Observable<Movie> {
    const url = `${this.moviesUrl}/first?q=${query}`;
    return this.http.get<Movie>(url).pipe(
      tap(_ => this.log(`found movie matching "${query}"`)),
      catchError(this.handleError<Movie>('searchFirstMovie'))
    );
  }

  private log(message: string) {
  this.messageService.add('MovieService: ' + message);
  }
  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
