import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BoardService } from '../../../../shared/providers/board.service';
import { LoadingService } from '../../../../shared/providers/loading.service';
import { MessageService } from '../../../../shared/providers/message.service';
import { SymbolPage } from '../../symbol/symbol';

@Component({
  selector: 'category-register',
  templateUrl: 'category-register.html'
})
export class CategoryRegister {
  public name: any;
  public description: any;
  public color: any;

  constructor(
    private navCtrl: NavController,
    private boardService: BoardService,
    private loadingService: LoadingService,
    private messageService: MessageService
  ) {}

  register() {
    if (!this.name || !this.description || !this.color) {
      this.messageService.showMessageRequiredFields();
    } else {
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
}
