import { Injectable } from '@angular/core'
import { Observable, of, throwError } from 'rxjs'
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  apiKey = `?apikey=7elxdku9GGG5k8j0Xm8KWdANDgecHMV0`;
  local = `&locale=*`;
  tickerMasterUrl = 'https://app.ticketmaster.com/discovery/v2/events';
  constructor(private http: HttpClient) { }

  getEvents(): Observable<any> {
    return this.http.get<any>(this.tickerMasterUrl + this.apiKey + this.local)
      .pipe(map(res => {
        const events = res._embedded.events
        return events;
      }),
        catchError(this.handleHttpError)

      );
  }

  getEvent(id: number): Observable<any> {
    return this.http.get<any>(this.tickerMasterUrl + '/' + id + this.apiKey + this.local)
      .pipe(catchError(this.handleHttpError))
  }

  searchEvents(searchTerm: string): Observable<any> {
    return this.http.get<any>(this.tickerMasterUrl + this.apiKey + '&keyword=' + searchTerm + this.local)
      .pipe(map(res => {
        const events = res._embedded.events
        return events;
      }),
        catchError(this.handleHttpError));
  }

  private handleHttpError(err) {

    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.message}`;
    } else {
      errorMessage = `Error in api returned code ${err.status}: ${err.message}`;
    }
    return throwError(errorMessage);
  }


}
