import { Component, OnInit } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { LoginService } from '../../../shared/providers/login.service';
import { ModuleRegister } from '../module-register/module-register';
import { ModulesService } from '../../../shared/providers/modules.service';
import { LoadingService } from '../../../shared/providers/loading.service';

@Component({
  selector: 'modules',
  templateUrl: 'modules.html'
})
export class ModulesPage implements OnInit {
  modules: any;

  constructor(
    private modalCtrl: ModalController,
    private modulesService: ModulesService,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    let loading: any = this.loadingService.createLoadingPage('Aguarde...');
    loading.present();

    this.modulesService.getModules().subscribe(
      modules => {
        this.modules = modules;
        loading.dismiss();
      },
      () => loading.dismiss()
    );
  }

  goToMenu() {
    this.modulesService.goToMenu(this.modules);
  }

  registerModule(module?: any) {
    let moduleRegisterModal = this.modalCtrl.create(ModuleRegister);
    if (module) {
      moduleRegisterModal = this.modalCtrl.create(ModuleRegister, { module });
    }
    moduleRegisterModal.present();
  }
}
