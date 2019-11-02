import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { LoadingService } from '../../../providers/loading.service';
import { MessageService } from '../../../providers/message.service';
import { ModulesService } from '../../../providers/modules.service';

@Component({
  selector: 'modal-profile',
  templateUrl: 'modules-register-modal.html'
})
export class ModuleRegisterModal {
  public module: any;

  constructor(
    private navParams: NavParams,
    private viewCtrl: ViewController,
    private modulesService: ModulesService,
    private loadingService: LoadingService,
    private messageService: MessageService
  ) {
    const params = this.navParams.get('module');
    this.module = params ? params : {};
  }

  viewDismiss() {
    this.viewCtrl.dismiss();
  }

  registerModule() {
    if (!this.module.title || !this.module.icon || !this.module.name || !this.module.roles.length) {
      this.messageService.showMessage('É necessario informar todas as informações para prosseguir');
      return;
    }

    let loading: any = this.loadingService.createLoadingPage('Aguarde...');
    loading.present();
    let observable = this.modulesService.newModule(this.module);
    if (this.module.id) {
      observable = this.modulesService.updateModule(this.module);
    }
    observable.subscribe(
      () => {
        this.viewDismiss();
        loading.dismiss();
      },
      () => loading.dismiss()
    );
  }
}
