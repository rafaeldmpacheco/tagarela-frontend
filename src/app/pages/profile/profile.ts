import { Component, OnInit } from '@angular/core';
import { App, ModalController, NavController, NavParams, ViewController } from 'ionic-angular';
import { LoginService } from '../../providers/login.service';
import { LoadingService } from '../../providers/loading.service';
import { LoginPage } from '../login/login';

@Component({
	selector: 'page-profile',
	templateUrl: 'profile.html'
})
export class ProfilePage implements OnInit {
	public user: any;

	constructor(
		public navCtrl: NavController,
		public modalCtrl: ModalController,
		private app: App,
		private loginService: LoginService
	) {}

	ngOnInit(): void {
		this.user = this.loginService.getUser();
	}

	atualizarUsuario() {
		let profileModal = this.modalCtrl.create(ProfileModal, { user: this.user });
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
					Perfil
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
				<ion-list center *ngIf="user">
					<ion-item>
						<ion-input
							type="text"
							[(ngModel)]="user.name"
							placeholder="usuário"
						></ion-input>
					</ion-item>
					<ion-item>
						<ion-input
							type="password"
							[(ngModel)]="user.password"
							placeholder="senha"
						></ion-input>
					</ion-item>
					<ion-item>
						<ion-label>papel</ion-label>
						<ion-select
							[(ngModel)]="user.roles"
							multiple="true"
							cancelText="Cancelar"
							okText="Salvar"
						>
							<ion-option value="TEACHER">Tutor</ion-option>
							<ion-option value="STUDENT">Paciente</ion-option>
							<ion-option value="SPECIALIST">Especialista</ion-option>
						</ion-select>
					</ion-item>
				</ion-list>
			</div>
			<ion-buttons start margin-left margin-right style="text-align: center">
				<button ion-button (click)="updateUser()">Atualizar</button>
			</ion-buttons>
		</ion-content>
	`
})
export class ProfileModal {
	public user: any;

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

	updateUser() {}
}
