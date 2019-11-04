import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ViewController } from 'ionic-angular';

@Component({
  selector: 'template-modal-register',
  templateUrl: './template-modal-register.component.html'
})
export class TemplateModalRegisterComponent implements OnInit {
  @Input() title: string;

  @Input() actionTitle = 'Salvar';

  @Output()
  register = new EventEmitter<any>();

  constructor(public viewCtrl: ViewController) {}

  ngOnInit() {}
}
