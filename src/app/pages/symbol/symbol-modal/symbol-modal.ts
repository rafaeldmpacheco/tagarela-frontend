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

@Component({
  selector: 'symbol-modal',
  templateUrl: 'symbol-modal.html'
})
export class SymbolModal {
  public name: any;
  public description: any;
  public type: any;
  public isPrivate: boolean;
  public image: any;
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
    private platform: Platform
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
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      allowEdit: true,
      saveToPhotoAlbum: true,
      targetWidth: 2210,
      targetHeight: 2210,
      quality: 100
    };

    this.camera
      .getPicture(options)
      .then(imageData => {
        this.image = 'data:image/jpeg;base64,' + imageData;
        loading.dismiss();
      })
      .catch(() => loading.dismiss());
  }

  register() {
    let loading: any = this.loadingService.createLoadingPage('Aguarde...');
    loading.present();

    const image = this.boardService.b64toBlob(this.image);

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
          this.boardService.uploadSymbol(response._id, this.audio, image)
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
