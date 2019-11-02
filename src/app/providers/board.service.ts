import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { File } from '@ionic-native/file';
import { Platform } from 'ionic-angular';
import { Observable } from 'rxjs';
import { API } from '../../config/config';

@Injectable()
export class BoardService {
  constructor(private httpClient: HttpClient, private file: File, private platform: Platform) {}

  public uploadSymbol(symbolId: string, audioFile: any, imageFile: any): Observable<any> {
    return Observable.create(observer => {
      const token = localStorage.getItem('token');
      const url: string = `https://tagarela-backend.herokuapp.com/saveSymbol/${symbolId}`;

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

  public getImage(fileId: string): Observable<any> {
    let url = `${API.URL}/file/${fileId}`;
    return this.httpClient.get(url);
  }

  public getMultipleSymbols(symbols: string[]): Observable<any> {
    let url = `${API.URL}/symbolsById`;
    return this.httpClient.post(url, symbols);
  }

  public getMultipleFiles(ids: string[]): Observable<any> {
    let url: string = `https://tagarela-backend.herokuapp.com/files`;
    return this.httpClient.post(url, ids);
  }

  public saveBoard(board: any): Observable<any> {
    let url = `${API.URL}/board`;
    return this.httpClient.post(url, board);
  }

  public updateBoard(board: any): Observable<any> {
    let url = `${API.URL}/board/` + board._id;
    return this.httpClient.put(url, board);
  }

  public getBoardsByPlan(planId): Observable<any> {
    let url = `${API.URL}/board/${planId}`;
    return this.httpClient.get(url);
  }

  public getPlans(): Observable<any> {
    let url = `${API.URL}/plans`;
    return this.httpClient.get(url);
  }

  public getPlansByUser(owner: string): Observable<any> {
    let url = `${API.URL}/plan/${owner}`;
    return this.httpClient.get(url);
  }

  public newPlan(plan): Observable<any> {
    let url = `${API.URL}/plan`;
    return this.httpClient.post(url, plan);
  }

  public getSymbols(): Observable<any> {
    let url = `${API.URL}/symbols`;
    return this.httpClient.get(url);
  }

  public newSymbol(newSymbol): Observable<any> {
    let url = `${API.URL}/symbol`;
    return this.httpClient.post(url, newSymbol);
  }

  public getCategories(): Observable<any> {
    let url = `${API.URL}/categories`;
    return this.httpClient.get(url);
  }

  public newCategory(newCategory): Observable<any> {
    let url = `${API.URL}/category`;
    return this.httpClient.post(url, newCategory);
  }

  /**
   * Convert a base64 string in a Blob according to the data and contentType.
   *
   * @param b64Data {String} Pure base64 string without contentType
   * @param sliceSize {Int} SliceSize to process the byteCharacters
   * @return Blob
   */
  public b64toBlob(b64Data, sliceSize = 512) {
    var byteArrays = [];

    for (var offset = 0; offset < b64Data.length; offset += sliceSize) {
      var slice = b64Data.slice(offset, offset + sliceSize);

      var byteNumbers = new Array(slice.length);
      for (var i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      var byteArray = new Uint8Array(byteNumbers);

      byteArrays.push(byteArray);
    }

    var blob = new Blob(byteArrays, { type: 'image/jpeg' });
    return blob;
  }

  mediaObjectToBlob(filePath, fileName): Promise<any> {
    if (this.platform.is('ios')) {
      filePath = this.file.documentsDirectory + fileName;
    } else if (this.platform.is('android')) {
      filePath = this.file.externalDataDirectory + fileName;
    }

    return new Promise((resolve, reject) => {
      let fileName,
        fileExtension = '';

      this.file
        .resolveLocalFilesystemUrl(filePath)
        .then(fileEntry => {
          let { name, nativeURL } = fileEntry;

          let path = nativeURL.substring(0, nativeURL.lastIndexOf('/'));
          fileName = name;

          fileExtension = fileName.match(/\.[A-z0-9]+$/i)[0].slice(1);

          return this.file.readAsArrayBuffer(path, name);
        })
        .then(buffer => {
          let blob = new Blob([buffer], {
            type: `audio/${fileExtension}`
          });

          resolve(blob);
        })
        .catch(e => reject(e));
    });
  }
}
