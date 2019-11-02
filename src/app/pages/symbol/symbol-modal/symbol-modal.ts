import { Component } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { Media, MediaObject } from '@ionic-native/media';
import { NavController, NavParams, Platform, ViewController } from 'ionic-angular';
import { BoardService } from '../../../providers/board.service';
import { LoadingService } from '../../../providers/loading.service';
import { CategoryPage } from '../../category/category';
import { mergeMap, map } from 'rxjs/operators';
import { ManageBoardPage } from '../../board/manage-board/manage-board';
import { BoardPage } from '../../board/board';
import { PlanPage } from '../../plan/plan';
import { MessageService } from '../../../providers/message.service';

@Component({
  selector: 'symbol-modal',
  templateUrl: 'symbol-modal.html'
})
export class SymbolModal {
  public name: any;
  public description: any;
  public type: any;
  public isPrivate = false;

  public image: any;
  public imageB64: string;
  public audio: any;

  private category: any;
  private board: any;
  private boardIndex: any;

  recording: boolean = false;
  audioFilePath: string;
  audioFileName: string;
  audioMediaObject: MediaObject;

  constructor(
    private navParams: NavParams,
    private viewCtrl: ViewController,
    private camera: Camera,
    private boardService: BoardService,
    private media: Media,
    private navCtrl: NavController,
    private loadingService: LoadingService,
    private file: File,
    private platform: Platform,
    private messageService: MessageService
  ) {
    if (this.navParams) {
      this.category = this.navParams.data.category;
      this.board = JSON.parse(localStorage.getItem('board'));
      this.boardIndex = JSON.parse(localStorage.getItem('boardIndex'));
    }
  }

  viewDismiss() {
    this.viewCtrl.dismiss();
  }

  startRecord() {
    this.audioFileName = `record${Date.now()}.3gp`;

    this.getFilePath(this.audioFileName);
    this.audioMediaObject = this.media.create(this.audioFilePath);

    this.audioMediaObject.startRecord();
    this.recording = true;
  }

  stopRecord() {
    this.audioMediaObject.stopRecord();

    let loading: any = this.loadingService.createLoadingPage('Aguarde...');
    loading.present();

    this.boardService
      .mediaObjectToBlob(this.audioFilePath, this.audioFileName)
      .then(response => {
        this.audio = response;
        this.recording = false;
        loading.dismiss();
      })
      .catch(() => loading.dismiss());
  }

  playAudio(file) {
    this.getFilePath(file);

    this.audioMediaObject = this.media.create(this.audioFilePath);
    this.audioMediaObject.play();
    this.audioMediaObject.setVolume(0.8);
  }

  getFilePath(file) {
    if (this.platform.is('ios')) {
      this.audioFilePath = this.file.documentsDirectory.replace(/file:\/\//g, '') + file;
    } else if (this.platform.is('android')) {
      this.audioFilePath = this.file.externalDataDirectory.replace(/file:\/\//g, '') + file;
    }
  }

  newImage(): void {
    let loading: any = this.loadingService.createLoadingPage('Aguarde...');
    loading.present();

    const options: CameraOptions = {
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      allowEdit: true,
      saveToPhotoAlbum: true,
      targetWidth: 2210,
      targetHeight: 2210,
      quality: 100
    };

    this.camera
      .getPicture(options)
      .then(imagePath => {
        return this.boardService
          .mediaObjectToBlob(imagePath, '', true)
          .then(response => (this.image = response));
      })
      .then((imageBlob: any) => {
        var reader = new FileReader();
        reader.readAsDataURL(imageBlob);

        reader.onloadend = function() {
          var base64data = reader.result;
          this.imageB64 = base64data;

          loading.dismiss();
        }.bind(this);
      })
      .catch(() => loading.dismiss());
  }

  register() {
    if (!this.name || !this.description || !this.audio || !this.image) {
      this.messageService.showMessage('É necessario informar todas as informações para prosseguir');
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
          this.boardService.uploadSymbol(response._id, this.audio, this.image)
        ),
        map((response: any) => {
          this.board.symbols.push({ symbolId: response._id, boardIndex: this.boardIndex });
          return this.board;
        }),
        mergeMap((response: any) => {
          response.name = response.name ? response.name : 'Prancha';

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
