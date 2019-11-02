import { Component } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { App, Platform } from 'ionic-angular';
import { LoginPage } from './modules/auth/login/login';
import { LoadingService } from './shared/providers/loading.service';
import { LoginService } from './shared/providers/login.service';
import { GridMenuComponent } from './shared/components/grid-menu/grid-menu.component';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = LoginPage;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    loginService: LoginService,
    loadingService: LoadingService,
    app: App
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      const user = JSON.parse(localStorage.getItem('user'));
      if (user) {
        let loading: any = loadingService.createLoadingPage('Aguarde...');
        loading.present();

        loginService.me(user._id).subscribe(
          response => {
            if (response) {
              app.getRootNav().push(GridMenuComponent);
              loading.dismiss();
            }
          },
          () => {
            loading.dismiss();
            app.getRootNav().push(LoginPage);
          }
        );
      } else {
        app.getRootNav().push(LoginPage);
      }
    });
  }
}
