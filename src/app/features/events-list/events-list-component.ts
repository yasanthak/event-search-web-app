import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'event-list',
  templateUrl: './events-list-component.html',
  styleUrls: ['./events-list-component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})

export class EventListComponent implements OnInit {

  events: any[] // Better to have typings for the events list
  error: string;

  constructor(private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.route.data.subscribe(data => {
      if (data.events.events) {
        this.events = data.events.events;
        this.error = '';
      } else {
        this.error = data.events.error;
      }
    });
  }



}