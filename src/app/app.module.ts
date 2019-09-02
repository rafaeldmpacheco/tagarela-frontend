import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Camera } from '@ionic-native/camera';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { GridMenuComponent } from './components/grid-menu/grid-menu.component';
import { CurrentBoardPage } from './pages/current-board/current-board';
import { BoardPage } from './pages/board/board';
import { LoginPage } from './pages/login/login';
import { ManageBoardPage } from './pages/manage-board/manage-board';
import { MenuPage } from './pages/menu/menu';
import { ProfileModal, ProfilePage } from './pages/profile/profile';
import { RegisterPage } from './pages/register/register';
import { BoardService } from './providers/board.service';
import { TokenInterceptor } from './providers/intercept-http.service';
import { LoadingService } from './providers/loading.service';
import { LoginService } from './providers/login.service';

const PAGES = [
	MyApp,
	ProfilePage,
	ProfileModal,
	BoardPage,
	MenuPage,
	LoginPage,
	RegisterPage,
	ManageBoardPage,
	CurrentBoardPage,
	GridMenuComponent
];
@NgModule({
	imports: [BrowserModule, IonicModule.forRoot(MyApp), HttpClientModule],
	bootstrap: [IonicApp],
	declarations: [...PAGES],
	entryComponents: [...PAGES],
	providers: [
		StatusBar,
		SplashScreen,
		Camera,
		LoginService,
		BoardService,
		LoadingService,
		{
			provide: ErrorHandler,
			useClass: IonicErrorHandler
		},
		{
			provide: HTTP_INTERCEPTORS,
			useClass: TokenInterceptor,
			multi: true
		}
	]
})
export class AppModule {}
