import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { BoardService } from '../../../providers/board.service';
import { LoadingService } from '../../../providers/loading.service';
import { CategoryPage } from '../../category/category';
import { map, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'manage-board',
  templateUrl: 'manage-board.html'
})
export class ManageBoardPage implements OnInit {
  public board: any = { name: '', symbols: [] };
  boardImagesUrl = ['', '', '', '', '', '', '', '', ''];
  boardAudios = ['', '', '', '', '', '', '', '', ''];
  boardArray = Array(9);

  constructor(
    private navCtrl: NavController,
    private boardService: BoardService,
    private loadingService: LoadingService,
    private navParams: NavParams
  ) {}

  ngOnInit(): void {
    if (this.navParams) {
      let { board, planId } = this.navParams.data;

      if (board) {
        this.board = board;

        const symbolIds = [];
        board.symbols.forEach(element => {
          symbolIds.push(element.symbolId);
        });

        let loading: any = this.loadingService.createLoadingPage('Aguarde...');
        loading.present();

        this.boardService
          .getMultipleSymbols(symbolIds)
          .pipe(
            map(symbols => {
              for (let index = 0; index < this.board.symbols.length; index++) {
                const element = this.board.symbols[index];

                for (let index = 0; index < symbols.length; index++) {
                  const symbol = symbols[index];

                  if (element.symbolId === symbol._id) {
                    this.boardImagesUrl[element.boardIndex] = symbol.image[0].url;
                    this.boardAudios[element.boardIndex] = symbol.audio[0].url;
                  }
                }
              }

              return symbols;
            })
          )
          .subscribe(
            () => {
              for (let index = 0; index < this.boardImagesUrl.length; index++) {
                const element = this.boardImagesUrl[index];

                if (element) {
                  const xhr = new XMLHttpRequest();

                  xhr.open('GET', element, true);
                  xhr.setRequestHeader('Authorization', `Bearer ${localStorage.getItem('token')}`);

                  xhr.onload = function(e: any) {
                    this.boardImagesUrl[index] = e.srcElement.responseURL;
                  }.bind(this);

                  xhr.send();
                }
              }

              loading.dismiss();
            },
            () => loading.dismiss()
          );
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
