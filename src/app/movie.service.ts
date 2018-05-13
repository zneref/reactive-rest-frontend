import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { Movie } from './movie';
import { MessageService } from './message.service';
import * as EventSource from 'eventsource';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'text/event-stream' })
//headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class MovieService {

  private movies: Movie[] = [];
  private zone = new NgZone({ enableLongStackTrace: false });

  private moviesUrl = 'https://webflux-rest-app.herokuapp.com/v1/movies';

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  getMovies(): Observable<Movie[]> {
    this.movies = [];
    return Observable.create((observer) => {
       let url = this.moviesUrl;
       let eventSource = new EventSource(url, httpOptions);
       eventSource.onmessage = (event) => this.zone.run(() => {
         console.debug('Received event: ', event);
         let json = JSON.parse(event.data);
         this.movies.push(new Movie(json['id'], json['title'], json['info']));
         observer.next(this.movies);
       });
       eventSource.onerror = (error) => this.zone.run(
         () =>observer.error('EventSource error: ' + error));
       return () => eventSource.close();
     });
  }

  searchMovies(query: string): Observable<Movie[]> {
    this.movies = [];
    return Observable.create((observer) => {
       let url = `${this.moviesUrl}/all?q=${query}`;
       let eventSource = new EventSource(url, httpOptions);
       eventSource.onmessage = (event) => this.zone.run(() => {
         console.debug('Received event: ', event);
         let json = JSON.parse(event.data);
         this.movies.push(new Movie(json['id'], json['title'], json['info']));
         observer.next(this.movies);
       });
      eventSource.onerror = (error) => this.zone.run(
         () => observer.error('EventSource error: ' + error));
      return () => eventSource.close();
     });
  }

  searchFirstMovie(query: string): Observable<Movie> {
    const url = `${this.moviesUrl}/first?q=${query}`;
    return this.http.get<Movie>(url).pipe(
      tap(_ => this.log(`found movie matching "${query}"`)),
      catchError(this.handleError<Movie>('searchFirstMovie'))
    );
  }

  getMovie(id: string): Observable<Movie> {
    const url = `${this.moviesUrl}/${id}`;
    return this.http.get<Movie>(url).pipe(
      tap(_ => this.log(`fetched movie id=${id}`)),
      catchError(this.handleError<Movie>(`getMovie id=${id}`))
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
