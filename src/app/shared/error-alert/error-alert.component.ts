import { Component, Input } from '@angular/core';

@Component({
  selector: 'error-alert',
  templateUrl: './error-alert.component.html',
  styleUrls: ['./error-alert.component.scss']
})

export class ErrorAlertComponent {
  @Input() errorMessege: string = "";

  constructor() { }

}