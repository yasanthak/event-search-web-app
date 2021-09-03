import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'event-list',
  templateUrl: './events-list-component.html',
  styleUrls: ['./events-list-component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})

export class EventListComponent implements OnInit {

  events: any[]
  error: string;

  constructor(private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.route.data.subscribe(data => {
      if (data.events.events) {
        this.events = data.events.events;
      } else {
        this.error = data.events.error;
      }
    });
  }



}