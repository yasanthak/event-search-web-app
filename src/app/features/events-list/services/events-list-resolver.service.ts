import { Injectable } from '@angular/core'
import { Resolve } from '@angular/router'
import { EventService } from '../../../shared/services';
import { of } from 'rxjs'
import { catchError, map } from 'rxjs/operators';


@Injectable()
export class EventListResolver implements Resolve<any> {
  constructor(private eventService: EventService) {

  }

  resolve() {
    return this.eventService.getEvents().pipe(
      map(response => ({ events: response })),
      catchError(error => {
        return of({ error: error });
      })
    )
    // return this.eventService.getEvents();

  }
}