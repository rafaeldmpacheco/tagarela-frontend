import { Component } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';
import { BoardService } from '../../../providers/board.service';
import { LoadingService } from '../../../providers/loading.service';
import { SymbolPage } from '../../symbol/symbol';

@Component({
  selector: 'category-modal',
  templateUrl: 'category-modal.html'
})
export class CategoryModal {
  public name: any;
  public description: any;
  public color: any;

  constructor(
    private viewCtrl: ViewController,
    private navCtrl: NavController,
    private boardService: BoardService,
    private loadingService: LoadingService
  ) {}

  viewDismiss() {
    this.viewCtrl.dismiss();
  }

  register() {
    let loading: any = this.loadingService.createLoadingPage('Aguarde...');
    loading.present();

    const newCategory = { name: this.name, description: this.description, color: this.color };

    this.boardService.newCategory(newCategory).subscribe(
      response => {
        this.navCtrl.push(SymbolPage, response);
        loading.dismiss();
      },
      () => loading.dismiss()
    );
  }
}
