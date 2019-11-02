import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from 'ionic-angular';
import { BoardService } from '../../../shared/providers/board.service';
import { LoadingService } from '../../../shared/providers/loading.service';
import { LoginService } from '../../../shared/providers/login.service';
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
  public userFiltered: string;

  constructor(
    private navCtrl: NavController,
    private loginService: LoginService,
    private loadingService: LoadingService,
    private modalCtrl: ModalController,
    private boardService: BoardService
  ) {
    this.user = this.loginService.getUser();
    this.canEdit = this.loginService.isTeacher();;
  }

  ngOnInit(): void {
    let loading: any = this.loadingService.createLoadingPage('Aguarde...');
    loading.present();

    this.userFiltered = localStorage.getItem('userFiltered');

    let observable = this.boardService.getPlansByUser(this.user.email);

    if (this.userFiltered && this.user.linkedUsers.some(user => this.userFiltered === user)) {
      observable = this.boardService.getPlansByUser(this.userFiltered);
    } else {
      localStorage.setItem('userFiltered', null);
    }

    observable.subscribe(
      response => {
        this.plans = response;
        loading.dismiss();
      },
      () => loading.dismiss()
    );
  }

  cadastrarPlano() {
    let planModal = this.modalCtrl.create(PlanModal, { userFiltered: this.userFiltered });
    planModal.present();
  }

  goToBoard(plan) {
    this.navCtrl.push(BoardPage, { planId: plan._id });
  }

  filter() {
    let loading: any = this.loadingService.createLoadingPage('Aguarde...');
    loading.present();

    localStorage.setItem('userFiltered', this.userFiltered);

    this.boardService.getPlansByUser(this.userFiltered).subscribe(
      response => {
        this.plans = response;
        loading.dismiss();
      },
      () => loading.dismiss()
    );
  }

  role() {
    if (this.canEdit) {
      return 'Paciente';
    }
    return 'Tutor';
  }
}
