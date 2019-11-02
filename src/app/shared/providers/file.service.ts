import { Injectable } from '@angular/core';
import { File } from '@ionic-native/file';
import { Platform } from 'ionic-angular';
import { Observable } from 'rxjs';
import { API } from '../../../config/config';

@Injectable()
export class FileService {
  constructor(private file: File, private platform: Platform) {}

  uploadSymbol(symbolId: string, audioFile: any, imageFile: any): Observable<any> {
    return Observable.create(observer => {
      const token = localStorage.getItem('token');
      const url = `${API.URL}/saveSymbol/${symbolId}`;

      const formData = new FormData();
      formData.append('audioFile', audioFile, 'record.3gp');
      formData.append('imageFile', imageFile, 'img.jpg');

      var xhr: XMLHttpRequest = new XMLHttpRequest();

      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            observer.next(JSON.parse(xhr.response));
            observer.complete();
          } else {
            observer.error(xhr.response);
          }
        }
      };

      xhr.open('POST', url, true);
      xhr.setRequestHeader('Authorization', `Bearer ${token}`);
      xhr.send(formData);
    });
  }

  mediaObjectToBlob(filePath, fileName?, isImage = false): Promise<any> {
    if (!isImage) {
      if (this.platform.is('ios')) {
        filePath = this.file.documentsDirectory + fileName;
      } else if (this.platform.is('android')) {
        filePath = this.file.externalDataDirectory + fileName;
      }
    }

    let mime = isImage ? 'image/' : 'audio/';

    return new Promise((resolve, reject) => {
      let fileName: string;

      this.file
        .resolveLocalFilesystemUrl(filePath)
        .then(fileEntry => {
          let { name, nativeURL } = fileEntry;

          let path = nativeURL.substring(0, nativeURL.lastIndexOf('/'));
          fileName = name;

          mime += fileName.match(/\.[A-z0-9]+$/i)[0].slice(1);

          return this.file.readAsArrayBuffer(path, name);
        })
        .then(buffer => {
          let blob = new Blob([buffer], {
            type: mime
          });

          resolve(blob);
        })
        .catch(e => reject(e));
    });
  }
}
