import { Component } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { NavController, Platform, App } from 'ionic-angular';
import { LoginPage } from './pages/login/login';
import { MenuPage } from './pages/menu/menu';
import { LoginService } from './providers/login.service';
import { LoadingService } from './providers/loading.service';

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

      let loading: any = loadingService.createLoadingPage('Aguarde...');
      loading.present();

      const user = JSON.parse(localStorage.getItem('user'));
      if (user) {
        loginService.me(user._id).subscribe(
          response => {
            if (response) {
              app.getRootNav().push(MenuPage);
              loading.dismiss();
            }
          },
          () => loading.dismiss()
        );
      }
    });
  }
}
