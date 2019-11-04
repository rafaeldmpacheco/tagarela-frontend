import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FileService } from '../../providers/file.service';
import { LoadingService } from '../../providers/loading.service';

@Component({
  selector: 'image-gallery',
  templateUrl: './image-gallery.component.html'
})
export class ImageGalleryComponent implements OnInit {
  @Input() image: any;
  @Output() imageChange: EventEmitter<any> = new EventEmitter<any>();

  imageB64: string;

  constructor(
    private camera: Camera,
    private loadingService: LoadingService,
    private fileService: FileService
  ) {}

  ngOnInit() {}

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
          this.imageChange.emit(this.image);
          loading.dismiss();
        }.bind(this);
      })
      .catch(() => loading.dismiss());
  }
}
