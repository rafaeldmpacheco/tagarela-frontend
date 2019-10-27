import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { BoardService } from '../../../providers/board.service';
import { LoadingService } from '../../../providers/loading.service';

@Component({
  selector: 'plan-modal',
  templateUrl: 'plan-modal.html'
})
export class PlanModal {
  public name: any;
  public description: any;
  public type: any;

  constructor(
    private loadingService: LoadingService,
    private viewCtrl: ViewController,
    private boardService: BoardService
  ) {}

  viewDismiss() {
    this.viewCtrl.dismiss();
  }

  register() {
    let loading: any = this.loadingService.createLoadingPage('Aguarde...');
    loading.present();
    this.boardService
      .newPlan({ name: this.name, description: this.description, type: this.type })
      .subscribe(
        () => {
          this.viewDismiss();
          loading.dismiss();
        },
        () => loading.dismiss()
      );
  }
}
