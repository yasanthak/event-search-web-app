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

  constructor(private route: ActivatedRoute) {

  }

  ngOnInit() {
    const events = this.route.snapshot.data['events']
    this.events = events;
  }



}