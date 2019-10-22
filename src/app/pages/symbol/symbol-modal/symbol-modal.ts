import { Component } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Media, MediaObject } from '@ionic-native/media';
import { File } from '@ionic-native/file';
import { NavController, NavParams, Platform, ViewController } from 'ionic-angular';
import { BoardService } from '../../../providers/board.service';
import { LoadingService } from '../../../providers/loading.service';
import { CategoryPage } from '../../category/category';

@Component({
  selector: 'symbol-modal',
  templateUrl: 'symbol-modal.html'
})
export class SymbolModal {
  public name: any;
  public description: any;
  public type: any;
  private boardIndex: any;

  recording: boolean = false;
  filePath: string;
  fileName: string;
  audio: MediaObject;
  audioList: any[] = [];

  constructor(
    private navParams: NavParams,
    private viewCtrl: ViewController,
    private camera: Camera,
    private boardService: BoardService,
    private media: Media,
    private file: File,
    private navCtrl: NavController,
    private loadingService: LoadingService,
    private platform: Platform
  ) {
    if (this.navParams.get('boardIndex')) {
      this.boardIndex = this.navParams.get('boardIndex');
    }
  }

  viewDismiss() {
    this.viewCtrl.dismiss();
  }

  getAudioList() {
    if (localStorage.getItem('audiolist')) {
      this.audioList = JSON.parse(localStorage.getItem('audiolist'));
      console.log(this.audioList);
    }
  }

  ionViewWillEnter() {
    this.getAudioList();
  }

  startRecord() {
    if (this.platform.is('ios')) {
      this.fileName =
        'record' +
        new Date().getDate() +
        new Date().getMonth() +
        new Date().getFullYear() +
        new Date().getHours() +
        new Date().getMinutes() +
        new Date().getSeconds() +
        '.3gp';
      this.filePath = this.file.documentsDirectory.replace(/file:\/\//g, '') + this.fileName;
      this.audio = this.media.create(this.filePath);
    } else if (this.platform.is('android')) {
      this.fileName =
        'record' +
        new Date().getDate() +
        new Date().getMonth() +
        new Date().getFullYear() +
        new Date().getHours() +
        new Date().getMinutes() +
        new Date().getSeconds() +
        '.3gp';
      this.filePath = this.file.externalDataDirectory.replace(/file:\/\//g, '') + this.fileName;
      this.audio = this.media.create(this.filePath);
    }
    this.audio.startRecord();
    this.recording = true;
  }

  stopRecord() {
    this.audio.stopRecord();
    let data = { filename: this.fileName };
    this.audioList.push(data);
    localStorage.setItem('audiolist', JSON.stringify(this.audioList));
    this.recording = false;
    this.getAudioList();
  }

  playAudio(file, idx) {
    if (this.platform.is('ios')) {
      this.filePath = this.file.documentsDirectory.replace(/file:\/\//g, '') + file;
      this.audio = this.media.create(this.filePath);
    } else if (this.platform.is('android')) {
      this.filePath = this.file.externalDataDirectory.replace(/file:\/\//g, '') + file;
      this.audio = this.media.create(this.filePath);
    }
    this.audio.play();
    this.audio.setVolume(0.8);
  }

  newImage(index): void {
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
        // this.board.images[index] = 'data:image/jpeg;base64,' + imageData;
        loading.dismiss();
      })
      .catch(error => {
        console.log(error);
        loading.dismiss();
      });
  }

  register() {
    // let loading: any = this.loadingService.createLoadingPage('Aguarde...');
    // loading.present();
    const newSymbol = {
      name: this.name,
      description: this.description
    };

    this.boardService.newSymbol(newSymbol).subscribe(
      () => {
        this.navCtrl.push(CategoryPage, {
          newSymbol: newSymbol,
          boardIndex: this.boardIndex
        });
        // loading.dismiss();
      },
      e => {
        // loading.dismiss();
        console.log(e);
      }
    );
  }
}
