import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { BoardService } from '../../../shared/providers/board.service';
import { LoginService } from '../../../shared/providers/login.service';
import { BoardRegisterPage } from './manage-board/manage-board';
import { LoadingService } from '../../../shared/providers/loading.service';

@Component({
  selector: 'page-board',
  templateUrl: 'board.html'
})
export class BoardPage implements OnInit {
  public boards: any[] = [];
  public planId: string;
  public canEdit = false;

  constructor(
    private navCtrl: NavController,
    private loginService: LoginService,
    private loadingService: LoadingService,
    private boardService: BoardService,
    private navParams: NavParams
  ) {
    this.canEdit = this.loginService.isTeacher();
    this.planId = this.navParams.data.planId;
  }

  ngOnInit(): void {
    let loading: any = this.loadingService.createLoadingPage('Aguarde...');
    loading.present();

    this.boardService.getBoardsByPlan(this.planId).subscribe(
      boards => {
        this.boards = boards;
        loading.dismiss();
      },
      () => loading.dismiss()
    );
  }

  cadastrarPrancha() {
    this.navCtrl.push(BoardRegisterPage, { planId: this.planId });
  }

  getBoard(board) {
    this.navCtrl.push(BoardRegisterPage, { board: board, planId: this.planId });
  }
}
