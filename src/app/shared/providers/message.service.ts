import { Injectable } from '@angular/core';
import { AlertController, ToastController, Toast, Alert } from 'ionic-angular';

@Injectable()
export class MessageService {
  constructor(private alertCtrl: AlertController, private toastCtrl: ToastController) {}

  public showMessage(message: string, error?: string): void {
    let toast: Toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'bottom',
      showCloseButton: error !== null && typeof error !== 'undefined',
      closeButtonText: 'Detalhes'
    });
    toast.onDidDismiss((data, role) => {
      if (role == 'close') {
        this.showErrorDetail(error);
      }
    });
    toast.present();
  }

  public showMessageRequiredFields(error?: string): void {
    this.showMessage('É necessario informar todas as informações para prosseguir');
  }

  private showErrorDetail(error: string): void {
    let alert: Alert = this.alertCtrl.create({
      title: 'Erro',
      subTitle: error,
      buttons: ['Fechar']
    });
    alert.present();
  }

  public showConfirmationMessage(title: string, message: string, confirmationAction: any): void {
    let alert = this.alertCtrl.create({
      title: title,
      message: message,
      buttons: [
        {
          text: 'Não'
        },
        {
          text: 'Sim',
          handler: () => {
            confirmationAction.actionPerformed();
          }
        }
      ]
    });
    alert.present();
  }
}
