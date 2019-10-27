import { Component, OnInit } from '@angular/core';
import { App, ModalController, NavController, ViewController } from 'ionic-angular';
import { LoadingService } from '../../providers/loading.service';
import { LoginService } from '../../providers/login.service';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage implements OnInit {
  public user: any;
  public isTeacher: boolean;

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    private app: App,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.user = this.loginService.getUser();
    this.isTeacher = this.user.roles.find(role => role === 'TEACHER');
  }

  role() {
    if (this.isTeacher) {
      return 'Tutor';
    }
    return 'Paciente';
  }

  invite() {
    let profileModal = this.modalCtrl.create(ProfileModal);
    profileModal.present();
  }

  logout() {
    this.app.getRootNav().push(LoginPage);
  }
}

@Component({
  selector: 'modal-profile',
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>
          Convidar
        </ion-title>
        <ion-buttons left>
          <button ion-button (click)="viewDismiss()">
            <ion-icon name="md-close" id="icon-close"></ion-icon>
          </button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <div>
        <ion-list center>
          <ion-item>
            <ion-input type="text" [(ngModel)]="linkedUser" placeholder="E-mail"></ion-input>
          </ion-item>
        </ion-list>
      </div>
      <ion-buttons start margin-left margin-right style="text-align: center">
        <button ion-button (click)="updateUser()">Convidar</button>
      </ion-buttons>
    </ion-content>
  `
})
export class ProfileModal {
  public user: any;
  public linkedUser: string;

  constructor(
    private viewCtrl: ViewController,
    private loadingService: LoadingService,
    private loginService: LoginService
  ) {
    this.user = this.loginService.getUser();
  }

  viewDismiss() {
    this.viewCtrl.dismiss();
  }

  updateUser() {
    let loading: any = this.loadingService.createLoadingPage('Aguarde...');
    loading.present();

    const body = {
      email: this.user.email,
      linkedUserEmail: this.linkedUser
    };

    this.loginService.linkUser(body).subscribe(
      () => {
        loading.dismiss();
        this.viewDismiss();
      },
      () => {
        loading.dismiss();
      }
    );
  }
}
