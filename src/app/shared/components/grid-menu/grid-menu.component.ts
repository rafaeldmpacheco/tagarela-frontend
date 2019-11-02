import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PlanPage } from '../../../modules/boards/plan/plan';
import { ProfilePage } from '../../../modules/profile/profile';
import { ModulesPage } from '../../../modules/settings/modules/modules';
import { LoadingService } from '../../providers/loading.service';
import { ModulesService } from '../../providers/modules.service';
import { LoginService } from '../../providers/login.service';

export interface GridMenuItem {
  title: string;
  action: any;
  icon: string;
  params?: any;
  roles: string[];
  isVisible: boolean;
}

@Component({
  selector: 'grid-menu',
  templateUrl: 'grid-menu.component.html'
})
export class GridMenuComponent implements OnInit {
  allMenuItems: any;
  isAdmin: boolean;

  private requiredModules = [];

  constructor(
    private navController: NavController,
    private modulesService: ModulesService,
    private loadingService: LoadingService,
    private loginService: LoginService
  ) {
    this.isAdmin = this.loginService.getUser().roles.some(role => role === 'ADMIN');

    this.allMenuItems = JSON.parse(localStorage.getItem('modules'));

    this.requiredModules = [
      {
        title: 'Perfil',
        action: () => this.navController.push(ProfilePage),
        icon: 'contact',
        roles: ['ADMIN', 'TEACHER', 'STUDENT'],
        isVisible: true,
        name: 'profile'
      },
      {
        title: 'Modulos',
        action: () => this.navController.push(ModulesPage),
        icon: 'cog',
        roles: ['ADMIN'],
        isVisible: true,
        name: 'modules'
      }
    ];
  }

  ngOnInit(): void {
    if (!this.allMenuItems) {
      let loading: any = this.loadingService.createLoadingPage('Aguarde...');
      loading.present();

      this.modulesService.getModules().subscribe(
        modules => {
          this.allMenuItems = modules.concat(this.requiredModules);

          this.allMenuItems.forEach(element => {
            this.setActions(element);

            element.isVisible = true;
          });

          localStorage.setItem('modules', JSON.stringify(modules));
          loading.dismiss();
        },
        () => loading.dismiss()
      );
    } else {
      this.allMenuItems = this.allMenuItems.concat(this.requiredModules);

      this.allMenuItems.forEach(element => {
        this.setActions(element);
      });
    }
  }

  isVisible(page) {
    if (page) {
      if (page.name === 'modules' && !this.isAdmin) {
        return false;
      }
      return page.isVisible;
    }
  }

  private setActions(element) {
    if (element.name === 'plan') {
      element.action = () => this.navController.push(PlanPage);
    }
  }
}
