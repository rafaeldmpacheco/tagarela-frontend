import {AfterViewInit, Component} from '@angular/core';
import {NavController, ModalController} from 'ionic-angular';
import {LoginService} from "../../providers/login.service";
import {LoadingService} from "../../providers/loading.service";
import { BoardService } from '../../providers/board.service';
import { BoardPage } from '../board/board';
import { PlanModal } from './plan-modal/plan-modal';

@Component({
	selector: 'page-plan',
	templateUrl: 'plan.html'
})
export class PlanPage  {

	public plans: any[] = [];
	public user: any;
	public canEdit: any;

	constructor(private navCtrl: NavController,
				private loginService: LoginService,
				private loadingService: LoadingService,
				public modalCtrl: ModalController,
				private boardService: BoardService) {
		this.user = this.loginService.getUser()
		this.canEdit = this.user.roles.find(role => role === 'TEACHER' || role === 'SPECIALIST');

		this.boardService.getPlans().subscribe(response => {
			this.plans = response
		})
	}

	cadastrarPlano() {
		let planModal = this.modalCtrl.create(PlanModal);
		planModal.present();
	}

	goToBoard(plan) {
		this.navCtrl.push(BoardPage, plan._id);
	}

}
