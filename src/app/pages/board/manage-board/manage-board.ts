import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { BoardService } from '../../../providers/board.service';
import { LoadingService } from '../../../providers/loading.service';
import { CategoryPage } from '../../category/category';
import { map, mergeMap, switchMap } from 'rxjs/operators';
import { MessageService } from '../../../providers/message.service';

@Component({
  selector: 'manage-board',
  templateUrl: 'manage-board.html'
})
export class ManageBoardPage implements OnInit {
  public board: any = { name: '', symbols: [] };
  categories: any[];
  symbols: any[];
  boardImagesUrl = ['', '', '', '', '', '', '', '', ''];
  boardAudios = ['', '', '', '', '', '', '', '', ''];
  boardColors = ['', '', '', '', '', '', '', '', ''];
  boardArray = Array(9);

  constructor(
    private navCtrl: NavController,
    private boardService: BoardService,
    private loadingService: LoadingService,
    private navParams: NavParams,
    private messageService: MessageService
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
            map(response => (this.symbols = response)),
            switchMap(() => this.boardService.getCategories()),
            map(response => (this.categories = response))
          )
          .subscribe(
            () => {
              for (let index = 0; index < this.board.symbols.length; index++) {
                const element = this.board.symbols[index];

                for (let index = 0; index < this.symbols.length; index++) {
                  const symbol = this.symbols[index];

                  if (element.symbolId === symbol._id) {
                    this.boardImagesUrl[element.boardIndex] = symbol.image[0].url;
                    this.boardAudios[element.boardIndex] = symbol.audio[0].url;

                    for (let index = 0; index < this.categories.length; index++) {
                      const category = this.categories[index];

                      if (category._id === symbol.categoryId) {
                        this.boardColors[element.boardIndex] = category.color;
                      }
                    }
                  }
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

  getBorderColor(i) {
    return this.boardColors && this.boardColors[i] ? this.boardColors[i] + ' 6px solid' : '';
  }

  addSymbol(index: number) {
    if (!this.board.name) {
      this.messageService.showMessage('É necessario informar um nome à prancha');
    } else {
      localStorage.setItem('boardIndex', JSON.stringify(index));
      localStorage.setItem('board', JSON.stringify(this.board));

      this.navCtrl.push(CategoryPage);
    }
  }

  saveBoard(): void {
    if (!this.board.name) {
      this.messageService.showMessage('É necessario informar um nome à prancha');
    } else {
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
  }

  selectedImage(index) {
    let audio = new Audio();
    audio.src = this.boardAudios[index];
    audio.load();
    audio.play();
  }
}
