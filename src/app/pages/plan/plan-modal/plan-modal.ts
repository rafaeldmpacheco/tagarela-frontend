import { Component } from '@angular/core';
import { ViewController, NavController, NavParams } from 'ionic-angular';
import { BoardService } from '../../../providers/board.service';
import { LoadingService } from '../../../providers/loading.service';
import { LoginService } from '../../../providers/login.service';
import { PlanPage } from '../plan';

@Component({
  selector: 'plan-modal',
  templateUrl: 'plan-modal.html'
})
export class PlanModal {
  public name: any;
  public description: any;
  public type: any;
  public user: any;
  private owner: string;

  constructor(
    private loadingService: LoadingService,
    private viewCtrl: ViewController,
    private boardService: BoardService,
    private loginService: LoginService,
    private navCtrl: NavController,
    private navParams: NavParams
  ) {
    this.user = this.loginService.getUser();
    if (this.navParams.get('userFiltered')) {
      this.owner = this.navParams.data.userFiltered;
    }
  }

  viewDismiss() {
    this.viewCtrl.dismiss();
  }

  register() {
    let loading: any = this.loadingService.createLoadingPage('Aguarde...');
    loading.present();
    this.boardService
      .newPlan({
        name: this.name,
        description: this.description,
        type: this.type,
        owner: this.owner ? this.owner : this.user.email
      })
      .subscribe(
        () => {
          this.navCtrl.push(PlanPage);
          loading.dismiss();
        },
        () => loading.dismiss()
      );
  }
}
