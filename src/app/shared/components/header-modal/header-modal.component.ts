import { Component, OnInit, Input } from '@angular/core';
import { ViewController } from 'ionic-angular';

@Component({
  selector: 'header-modal',
  templateUrl: './header-modal.component.html'
})
export class HeaderModalComponent implements OnInit {
  @Input()
  title: string;

  constructor(public viewCtrl: ViewController) {}

  ngOnInit() {}
}
