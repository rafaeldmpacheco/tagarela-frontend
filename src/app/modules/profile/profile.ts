import { Component, OnInit } from '@angular/core';
import { App, ModalController, NavController } from 'ionic-angular';
import { LoadingService } from '../../shared/providers/loading.service';
import { LoginService } from '../../shared/providers/login.service';
import { ModulesService } from '../../shared/providers/modules.service';
import { LoginPage } from '../auth/login/login';
import { InviteUserPage } from './invite-user/invite-user';

@Component({
  selector: 'profile',
  templateUrl: 'profile.html'
})
export class ProfilePage implements OnInit {
  public modules: any;
  public user: any;
  public isTeacher: boolean;

  constructor(
    private app: App,
    private modalCtrl: ModalController,
    private loginService: LoginService,
    private modulesService: ModulesService,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.user = this.loginService.getUser();
    this.isTeacher = this.loginService.isTeacher();

    this.modules = JSON.parse(localStorage.getItem('modules'));

    if (!this.modules) {
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
  }

  // role() {
  //   if (this.isTeacher) {
  //     return 'Tutor';
  //   }
  //   return 'Paciente';
  // }

  translateRole(role) {
    if (role === 'ADMIN') {
      return 'Administrador';
    } else if (role === 'TEACHER') {
      return 'Tutor';
    } else {
      return 'Paciente';
    }
  }

  goToMenu() {
    this.modulesService.goToMenu(this.modules);
  }

  invite() {
    let profileModal = this.modalCtrl.create(InviteUserPage);
    profileModal.present();
  }

  logout() {
    localStorage.clear();
    this.app.getRootNav().push(LoginPage);
  }
}
