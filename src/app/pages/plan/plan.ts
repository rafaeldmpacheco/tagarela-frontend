import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from 'ionic-angular';
import { BoardService } from '../../providers/board.service';
import { LoadingService } from '../../providers/loading.service';
import { LoginService } from '../../providers/login.service';
import { BoardPage } from '../board/board';
import { PlanModal } from './plan-modal/plan-modal';

@Component({
  selector: 'page-plan',
  templateUrl: 'plan.html'
})
export class PlanPage implements OnInit {
  public plans: any[] = [];
  public user: any;
  public canEdit: any;

  constructor(
    private navCtrl: NavController,
    private loginService: LoginService,
    private loadingService: LoadingService,
    private modalCtrl: ModalController,
    private boardService: BoardService
  ) {
    this.user = this.loginService.getUser();
    this.canEdit = this.user.roles.find(role => role === 'TEACHER');
  }

  ngOnInit(): void {
    let loading: any = this.loadingService.createLoadingPage('Aguarde...');
    loading.present();

    this.boardService.getPlans().subscribe(
      response => {
        this.plans = response;
        loading.dismiss();
      },
      () => loading.dismiss()
    );
  }

  cadastrarPlano() {
    let planModal = this.modalCtrl.create(PlanModal);
    planModal.present();
  }

  goToBoard(plan) {
    this.navCtrl.push(BoardPage, { planId: plan._id });
  }
}
