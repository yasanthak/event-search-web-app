import { Component } from '@angular/core';
import { EventService } from '../../shared/services';


@Component({
  selector: 'event-search',
  templateUrl: './search-events.component.html',
  styleUrls: ['./search-events.component.scss']
})

export class SearchEventsComponent {
  searchTerm: string = "";
  error: string;
  events: any[];
  constructor(private eventService: EventService) {

  }

  /**
   * This method will search for events based on the search term provided and hadles errors
   * acordingly if there is an error from api
   *
   * @param {string} searchTerm
   * @memberof SearchEventsComponent
   */
  searchEvents(searchTerm: string) {
    this.eventService.searchEvents(searchTerm)
      .subscribe(response => {
        if (response.success) {
          this.events = response.events;
          this.error = '';
        } else {
          this.error = response.message;
        }
      },
        error => {
          this.error = error
        });
  }

}