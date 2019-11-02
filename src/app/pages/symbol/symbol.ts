import { Component, OnInit } from '@angular/core';
import { ModalController, NavController, NavParams } from 'ionic-angular';
import { BoardService } from '../../providers/board.service';
import { LoadingService } from '../../providers/loading.service';
import { PlanPage } from '../plan/plan';
import { SymbolModal } from './symbol-modal/symbol-modal';

@Component({
  selector: 'page-symbol',
  templateUrl: 'symbol.html'
})
export class SymbolPage implements OnInit {
  public symbols: any[] = [];

  private category: any;
  private board: any;
  private boardIndex: any;

  constructor(
    private navCtrl: NavController,
    private modalCtrl: ModalController,
    private boardService: BoardService,
    private loadingService: LoadingService,
    private navParams: NavParams
  ) {
    if (this.navParams) {
      this.category = this.navParams.data.category;
      this.board = JSON.parse(localStorage.getItem('board'));
      this.boardIndex = JSON.parse(localStorage.getItem('boardIndex'));
    }
  }

  ngOnInit(): void {
    if (this.category) {
      let loading: any = this.loadingService.createLoadingPage('Aguarde...');
      loading.present();

      this.boardService.getSymbols(this.category._id).subscribe(
        response => {
          this.symbols = response;
          loading.dismiss();
        },
        () => loading.dismiss()
      );
    }
  }

  registerSymbol() {
    let symbolModal = this.modalCtrl.create(SymbolModal, { category: this.category });
    symbolModal.present();
  }

  goToBoard(newSymbol) {
    let loading: any = this.loadingService.createLoadingPage('Aguarde...');
    loading.present();

    this.board.name = this.board.name ? this.board.name : 'Prancha';
    this.board.symbols.push({ symbolId: newSymbol._id, boardIndex: this.boardIndex });

    let observable = this.boardService.saveBoard(this.board);
    if (this.board._id) {
      observable = this.boardService.updateBoard(this.board);
    }
    observable.subscribe(
      () => {
        this.navCtrl.push(PlanPage);
        loading.dismiss();
      },
      () => loading.dismiss()
    );
  }
}
