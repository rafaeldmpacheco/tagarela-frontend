import { Component } from '@angular/core';
import { ModalController, NavController } from 'ionic-angular';
import { BoardService } from '../../providers/board.service';
import { LoadingService } from '../../providers/loading.service';
import { SymbolPage } from '../symbol/symbol';
import { CategoryModal } from './category-modal/category-modal';

@Component({
  selector: 'page-category',
  templateUrl: 'category.html'
})
export class CategoryPage {
  public categories: any[] = [];

  constructor(
    private navCtrl: NavController,
    private modalCtrl: ModalController,
    private boardService: BoardService,
    private loadingService: LoadingService
  ) {
    let loading: any = this.loadingService.createLoadingPage('Aguarde...');
    loading.present();

    this.boardService.getCategories().subscribe(
      response => {
        this.categories = response;
        loading.dismiss();
      },
      () => loading.dismiss()
    );
  }

  registerCategory() {
    let categoryModal = this.modalCtrl.create(CategoryModal);
    categoryModal.present();
  }

  goToSymbol(category) {
    this.navCtrl.push(SymbolPage, { category });
  }
}
