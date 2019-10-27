import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { BoardService } from '../../providers/board.service';
import { LoadingService } from '../../providers/loading.service';
import { LoginService } from '../../providers/login.service';
import { ManageBoardPage } from './manage-board/manage-board';

@Component({
  selector: 'page-board',
  templateUrl: 'board.html'
})
export class BoardPage implements OnInit {
  public boards: any[] = [];
  public user: any;
  public planId: string;
  public canEdit = false;

  constructor(
    private navCtrl: NavController,
    private loginService: LoginService,
    private loadingService: LoadingService,
    private boardService: BoardService,
    private navParams: NavParams
  ) {
    this.user = this.loginService.getUser();
    this.canEdit = this.user.roles.find(role => role === 'TEACHER');
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
    this.navCtrl.push(ManageBoardPage, { planId: this.planId });
  }

  getBoard(board) {
    this.navCtrl.push(ManageBoardPage, { board: board, planId: this.planId });
  }
}
