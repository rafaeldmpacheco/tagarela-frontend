import { Component, OnInit } from '@angular/core';
import { App, ModalController, NavController } from 'ionic-angular';
import { LoginPage } from '../auth/login/login';
import { MenuPage } from '../../core/menu/menu';
import { LoginService } from '../../shared/providers/login.service';
import { InviteUserPage } from './invite-user/invite-user';
import { ModulesService } from '../../shared/providers/modules.service';

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
    private navCtrl: NavController,
    private modalCtrl: ModalController,
    private loginService: LoginService,
    private modulesService: ModulesService
  ) {}

  ngOnInit(): void {
    this.isTeacher = this.loginService.isTeacher();

    this.modules = JSON.parse(localStorage.getItem('modules'));

    if (!this.modules) {
      this.modulesService.getModules().subscribe(modules => {
        this.modules = modules;
      });
    }
  }

  role() {
    if (this.isTeacher) {
      return 'Tutor';
    }
    return 'Paciente';
  }

  goToMenu() {
    localStorage.setItem('modules', JSON.stringify(this.modules));
    this.navCtrl.push(MenuPage);
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
