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

  searchEvents(searchTerm: string) {
    this.eventService.searchEvents(searchTerm)
      .subscribe(events => {
        this.events = events
        this.error = '';
      },
        error => {
          this.error = error
        });
  }

}