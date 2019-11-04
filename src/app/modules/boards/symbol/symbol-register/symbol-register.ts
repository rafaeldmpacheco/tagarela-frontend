import { Component } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { Media, MediaObject } from '@ionic-native/media';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { map, mergeMap } from 'rxjs/operators';
import { BoardService } from '../../../../shared/providers/board.service';
import { FileService } from '../../../../shared/providers/file.service';
import { LoadingService } from '../../../../shared/providers/loading.service';
import { MessageService } from '../../../../shared/providers/message.service';
import { PlanPage } from '../../plan/plan';

@Component({
  selector: 'symbol-register',
  templateUrl: 'symbol-register.html'
})
export class SymbolRegister {
  public name: any;
  public description: any;
  public type: any;
  public isPrivate = false;

  public image: any;
  public audio: any;

  private category: any;
  private board: any;
  private boardIndex: any;

  constructor(
    private navParams: NavParams,
    private boardService: BoardService,
    private navCtrl: NavController,
    private loadingService: LoadingService,
    private messageService: MessageService,
    private fileService: FileService
  ) {
    if (this.navParams) {
      this.category = this.navParams.data.category;
      this.board = JSON.parse(localStorage.getItem('board'));
      this.boardIndex = JSON.parse(localStorage.getItem('boardIndex'));
    }
  }

  register() {
    if (!this.name || !this.description || !this.audio || !this.image) {
      this.messageService.showMessageRequiredFields();
      return;
    }

    let loading: any = this.loadingService.createLoadingPage('Aguarde...');
    loading.present();

    let newSymbol = {
      name: this.name,
      description: this.description,
      isPrivate: this.isPrivate,
      categoryId: this.category._id
    };

    this.boardService
      .newSymbol(newSymbol)
      .pipe(
        mergeMap((response: any) =>
          this.fileService.uploadSymbol(response._id, this.audio, this.image)
        ),
        map((response: any) => {
          this.board.symbols.push({ symbolId: response._id, boardIndex: this.boardIndex });
          return this.board;
        }),
        mergeMap((response: any) => {
          let observable = this.boardService.saveBoard(response);

          if (response._id) {
            observable = this.boardService.updateBoard(response);
          }

          return observable;
        })
      )
      .subscribe(
        () => {
          this.navCtrl.push(PlanPage);
          loading.dismiss();
        },
        () => loading.dismiss()
      );
  }
}
