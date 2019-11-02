import { Component, OnInit } from '@angular/core';
import { ModalController } from 'ionic-angular';
import { LoginService } from '../../../shared/providers/login.service';
import { ModuleRegister } from '../module-register/module-register';
import { ModulesService } from '../../../shared/providers/modules.service';

@Component({
  selector: 'modules',
  templateUrl: 'modules.html'
})
export class ModulesPage implements OnInit {
  modules: any;
  isAdmin: boolean;

  constructor(
    private modalCtrl: ModalController,
    private modulesService: ModulesService,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.isAdmin = this.loginService.getUser().roles.some(role => role === 'ADMIN');

    this.modulesService.getModules().subscribe(modules => {
      this.modules = modules;
    });
  }

  registerModule(module?: any) {
    let moduleRegisterModal = this.modalCtrl.create(ModuleRegister);
    if (module) {
      moduleRegisterModal = this.modalCtrl.create(ModuleRegister, { module });
    }
    moduleRegisterModal.present();
  }
}
