import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { map, switchMap } from 'rxjs/operators';
import { BoardService } from '../../../../shared/providers/board.service';
import { LoadingService } from '../../../../shared/providers/loading.service';
import { MessageService } from '../../../../shared/providers/message.service';
import { CategoryPage } from '../../category/category';
import { PlanPage } from '../../plan/plan';

@Component({
  selector: 'board-register',
  templateUrl: 'board-register.html'
})
export class BoardRegisterPage implements OnInit {
  board: any = { name: '', symbols: [] };
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

        this.getSymbols(symbolIds, loading);
      }

      this.board.planId = planId;
    }
  }

  getSymbols(symbolIds, loading) {
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

  selectedImage(index) {
    let audio = new Audio();
    audio.src = this.boardAudios[index];
    audio.load();
    audio.play();
  }

  duplicateBoard() {
    const newBoard = { ...this.board };

    for (let index = 0; index < this.symbols.length; index++) {
      const symbol = this.symbols[index];

      for (let index = 0; index < newBoard.symbols.length; index++) {
        const newBoardSymbol = newBoard.symbols[index];

        if (symbol._id === newBoardSymbol.symbolId && symbol.isPrivate) {
          newBoardSymbol.symbols = newBoard.symbols.splice(index, 1);
        }
      }
    }
    delete newBoard._id;
    newBoard.name += ' - Duplicado';

    this.board = newBoard;
  }

  saveBoard(): void {
    const board = this.board;

    if (!board.name) {
      this.messageService.showMessage('É necessario informar um nome à prancha');
      return;
    }

    let observable = this.boardService.saveBoard(board);
    if (board._id) {
      observable = this.boardService.updateBoard(board);
    }

    let loading: any = this.loadingService.createLoadingPage('Aguarde...');
    loading.present();

    observable.subscribe(
      () => {
        this.navCtrl.push(PlanPage);
        loading.dismiss();
      },
      () => loading.dismiss()
    );
  }
}
