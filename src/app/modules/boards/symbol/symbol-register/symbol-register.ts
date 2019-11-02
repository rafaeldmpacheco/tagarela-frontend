import { Component } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { Media, MediaObject } from '@ionic-native/media';
import { NavController, NavParams, Platform, ViewController } from 'ionic-angular';
import { map, mergeMap } from 'rxjs/operators';
import { LoadingService } from '../../../../shared/providers/loading.service';
import { MessageService } from '../../../../shared/providers/message.service';
import { BoardService } from '../../../../shared/providers/board.service';
import { PlanPage } from '../../plan/plan';
import { FileService } from '../../../../shared/providers/file.service';

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
    private messageService: MessageService,
    private fileService: FileService,
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

    this.fileService
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
        return this.fileService
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
