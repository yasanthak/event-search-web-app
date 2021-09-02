import { Component, OnInit, Input, ViewEncapsulation }
  from '@angular/core';

@Component({
  selector: 'event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.scss'],
  encapsulation: ViewEncapsulation.None,
})



export class EventCardComponent implements OnInit {

  @Input() event: any;

  constructor() { }

  ngOnInit() {

  }



}