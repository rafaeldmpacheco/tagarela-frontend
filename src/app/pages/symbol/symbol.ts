import { Component, OnInit } from '@angular/core';
import { ModalController, NavController, NavParams } from 'ionic-angular';
import { BoardService } from '../../providers/board.service';
import { LoginService } from '../../providers/login.service';
import { ManageBoardPage } from '../board/manage-board/manage-board';
import { SymbolModal } from './symbol-modal/symbol-modal';
import { LoadingService } from '../../providers/loading.service';

@Component({
  selector: 'page-symbol',
  templateUrl: 'symbol.html'
})
export class SymbolPage implements OnInit {
  public symbols: any[] = [];
  public user: any;
  private board: any;
  private boardIndex: number;

  constructor(
    private navCtrl: NavController,
    private loginService: LoginService,
    private modalCtrl: ModalController,
    private boardService: BoardService,
    private loadingService: LoadingService,
    private navParams: NavParams
  ) {
    this.user = this.loginService.getUser();

    if (this.navParams) {
      this.boardIndex = this.navParams.get('boardIndex');
      this.board = this.navParams.get('board');
    }
  }

  ngOnInit(): void {
    let loading: any = this.loadingService.createLoadingPage('Aguarde...');
    loading.present();

    this.boardService.getSymbols().subscribe(
      response => {
        this.symbols = response;
        loading.dismiss();
      },
      () => loading.dismiss()
    );
  }

  registerSymbol() {
    let symbolModal = this.modalCtrl.create(SymbolModal, {
      boardIndex: this.boardIndex,
      board: this.board
    });
    symbolModal.present();
  }

  goToBoard(newSymbol) {
    this.navCtrl.push(ManageBoardPage, { newSymbol: newSymbol, boardIndex: this.boardIndex });
  }
}
