import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular/index';

@Injectable()
export class ExceptionService {
  constructor(private alertCtrl: AlertController) {}

  public throwException(): void {
    let alert = this.alertCtrl.create({
      subTitle:
        'Ocorreu um erro inesperado em nosso servidor. Tente novamente me alguns instantes.',
      buttons: ['OK']
    });
    alert.present();
  }
}
