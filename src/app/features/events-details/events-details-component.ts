import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'event-list',
  templateUrl: './events-details-component.html',
  styleUrls: ['./events-details-component.scss'],
  encapsulation: ViewEncapsulation.None

})


export class EventsDetailsComponent implements OnInit {

  event: any;
  constructor(private route: ActivatedRoute) { }


  ngOnInit() {
    this.route.data.forEach((data) => {
      this.event = data['event'];
    })
  }

}