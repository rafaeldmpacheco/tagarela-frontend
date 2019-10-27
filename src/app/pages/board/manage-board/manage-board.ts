import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { BoardService } from '../../../providers/board.service';
import { LoadingService } from '../../../providers/loading.service';
import { SymbolPage } from '../../symbol/symbol';

@Component({
  selector: 'manage-board',
  templateUrl: 'manage-board.html'
})
export class ManageBoardPage implements OnInit {
  public board: any = { name: '', images: [] };
  boardArray = Array(9);

  constructor(
    private navCtrl: NavController,
    private boardService: BoardService,
    private loadingService: LoadingService,
    private navParams: NavParams
  ) {}

  ngOnInit(): void {
    if (this.navParams) {
      let { boardIndex, newSymbol, board, planId } = this.navParams.data;

      if (board) {
        this.board = this.navParams.data.board;
      }

      if (newSymbol) {
        this.board.images[boardIndex] = newSymbol;
      }

      this.board.planId = planId;
    }
  }

  saveBoard(index?: number): void {
    this.board.name = this.board.name ? this.board.name : 'Prancha';

    let observable = this.boardService.saveBoard(this.board);
    if (this.board._id) {
      observable = this.boardService.updateBoard(this.board);
    }

    if (!index && this.board.images.length < 9) {
      return;
    }

    let loading: any = this.loadingService.createLoadingPage('Aguarde...');
    loading.present();

    observable.subscribe(
      board => {
        if (index) {
          this.navCtrl.push(SymbolPage, { boardIndex: index, board: board });
        } else {
          this.navCtrl.pop();
        }
        loading.dismiss();
      },
      () => loading.dismiss()
    );
  }

  selectedImage(index) {
    console.log('play sound');
  }
}
