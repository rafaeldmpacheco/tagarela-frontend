import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'alert-message',
  templateUrl: './alert-message.component.html'
})
export class AlertMessageComponent implements OnInit {
  @Input() exceptionMessage: string;

  constructor() {}

  ngOnInit() {}
}
