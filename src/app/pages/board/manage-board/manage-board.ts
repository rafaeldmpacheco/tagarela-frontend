import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { BoardService } from '../../../providers/board.service';
import { LoadingService } from '../../../providers/loading.service';
import { CategoryPage } from '../../category/category';

@Component({
  selector: 'manage-board',
  templateUrl: 'manage-board.html'
})
export class ManageBoardPage implements OnInit {
  public board: any = { name: '', images: Array(9), symbols: [] };

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
        let loading: any = this.loadingService.createLoadingPage('Aguarde...');
        loading.present();

        this.boardService.getMultipleFiles(board.images).subscribe(
          response => {
            this.board = this.navParams.data.board;
            this.board.images = response;

            for (let index = 0; index < response.length; index++) {
              const element = response[index];
              const xhr = new XMLHttpRequest();

              xhr.open('GET', element.url, true);
              xhr.setRequestHeader('Authorization', `Bearer ${localStorage.getItem('token')}`);

              xhr.onload = function(e: any) {
                this.board.images[index] = e.srcElement.responseURL;
              }.bind(this);

              xhr.send();
            }

            loading.dismiss();
          },
          () => loading.dismiss()
        );
      }

      if (newSymbol) {
        this.board.images[boardIndex] = newSymbol;
      }

      this.board.planId = planId;
    }
  }

  addSymbol(index: number) {
    localStorage.setItem('boardIndex', JSON.stringify(index));
    localStorage.setItem('board', JSON.stringify(this.board));

    this.navCtrl.push(CategoryPage);
  }

  saveBoard(): void {
    this.board.name = this.board.name ? this.board.name : 'Prancha';

    let observable = this.boardService.saveBoard(this.board);
    if (this.board._id) {
      observable = this.boardService.updateBoard(this.board);
    }

    let loading: any = this.loadingService.createLoadingPage('Aguarde...');
    loading.present();

    observable.subscribe(
      () => {
        this.navCtrl.pop();
        loading.dismiss();
      },
      () => loading.dismiss()
    );
  }

  selectedImage(index) {
    console.log('play sound');
  }
}
