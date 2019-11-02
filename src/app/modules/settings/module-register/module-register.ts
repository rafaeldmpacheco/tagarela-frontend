import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { LoadingService } from '../../../shared/providers/loading.service';
import { MessageService } from '../../../shared/providers/message.service';
import { ModulesService } from '../../../shared/providers/modules.service';

@Component({
  selector: 'module-register',
  templateUrl: 'module-register.html'
})
export class ModuleRegister {
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

  registerModule() {
    if (!this.module.title || !this.module.icon || !this.module.name || !this.module.roles.length) {
      this.messageService.showMessageRequiredFields();
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
        loading.dismiss();
        this.viewCtrl.dismiss();
      },
      () => loading.dismiss()
    );
  }
}
