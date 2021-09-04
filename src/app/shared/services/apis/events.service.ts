import { Injectable } from '@angular/core'
import { Observable, throwError } from 'rxjs'
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

  /**
   * Api call to retrieve events 
   * Ideally event should have proper typing
   *
   * @return {*}  {Observable<any>}
   * @memberof EventService
   */
  getEvents(): Observable<any> {
    return this.http.get<any>(this.tickerMasterUrl + this.apiKey + this.local)
      .pipe(map(res => {
        const events = res._embedded.events
        return events;
      }),
        catchError(this.handleHttpError)

      );
  }

  /**
   * Api call to retrieve an event 
   *
   * @param {number} id
   * @return {*}  {Observable<any>}
   * @memberof EventService
   */
  getEvent(id: number): Observable<any> {
    return this.http.get<any>(this.tickerMasterUrl + '/' + id + this.apiKey + this.local)
      .pipe(catchError(this.handleHttpError))
  }

  /**
   * Api call to search events based on the search term provided
   *
   * @param {string} searchTerm
   * @return {*}  {Observable<any>}
   * @memberof EventService
   */
  searchEvents(searchTerm: string): Observable<any> {
    return this.http.get<any>(this.tickerMasterUrl + this.apiKey + '&keyword=' + searchTerm + this.local)
      .pipe(map(res => {
        if (res._embedded && res._embedded.events) {
          return { success: true, events: res._embedded.events };
        } else {
          return { success: false, message: 'No events found for the provided search' };
        }

      }),
        catchError(this.handleHttpError));
  }

  /**
   * Handles http error if there is an error from api
   *
   * @private
   * @param {*} err
   * @return {*} 
   * @memberof EventService
   */
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
