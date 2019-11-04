import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { LoadingService } from '../../../../shared/providers/loading.service';
import { BoardService } from '../../../../shared/providers/board.service';
import { LoginService } from '../../../../shared/providers/login.service';
import { PlanPage } from '../plan';
import { MessageService } from '../../../../shared/providers/message.service';

@Component({
  selector: 'plan-register',
  templateUrl: 'plan-register.html'
})
export class PlanRegister {
  public name: any;
  public description: any;
  public type: any;
  private user: any;
  private owner: string;

  constructor(
    private loadingService: LoadingService,
    private viewCtrl: ViewController,
    private boardService: BoardService,
    private loginService: LoginService,
    private navCtrl: NavController,
    private navParams: NavParams,
    private messageService: MessageService
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
    if (!this.name || !this.description || !this.type) {
      this.messageService.showMessageRequiredFields();
      return;
    }

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
