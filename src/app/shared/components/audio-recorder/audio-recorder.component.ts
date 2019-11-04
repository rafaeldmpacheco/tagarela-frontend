import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { File } from '@ionic-native/file';
import { Media, MediaObject } from '@ionic-native/media';
import { Platform } from 'ionic-angular';
import { FileService } from '../../providers/file.service';
import { LoadingService } from '../../providers/loading.service';

@Component({
  selector: 'audio-recorder',
  templateUrl: './audio-recorder.component.html'
})
export class AudioRecorderComponent implements OnInit {
  @Input() audio: any;
  @Output() audioChange: EventEmitter<any> = new EventEmitter<any>();

  recording: boolean = false;
  audioFilePath: string;
  audioFileName: string;
  audioMediaObject: MediaObject;

  constructor(
    private media: Media,
    private loadingService: LoadingService,
    private file: File,
    private platform: Platform,
    private fileService: FileService
  ) {}

  ngOnInit() {}

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
        this.audioChange.emit(this.audio);
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
}
