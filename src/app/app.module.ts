import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Camera } from '@ionic-native/camera';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { GridMenuComponent } from './components/grid-menu/grid-menu.component';
import { BoardPage } from './pages/board/board';
import { ManageBoardPage } from './pages/board/manage-board/manage-board';
import { LoginPage } from './pages/login/login';
import { MenuPage } from './pages/menu/menu';
import { ModulesPage } from './pages/modules/modules';
import { ModuleRegisterModal } from './pages/modules/modules-register-modal/modules-register-modal';
import { PlanPage } from './pages/plan/plan';
import { PlanModal } from './pages/plan/plan-modal/plan-modal';
import { ProfileModal, ProfilePage } from './pages/profile/profile';
import { RegisterPage } from './pages/register/register';
import { SymbolPage } from './pages/symbol/symbol';
import { SymbolModal } from './pages/symbol/symbol-modal/symbol-modal';
import { BoardService } from './providers/board.service';
import { TokenInterceptor } from './providers/intercept-http.service';
import { LoadingService } from './providers/loading.service';
import { LoginService } from './providers/login.service';
import { ModulesService } from './providers/modules.service';
import { CategoryPage } from './pages/category/category';
import { CategoryModal } from './pages/category/category-modal/category-modal';

const PAGES = [
	MyApp,
	ProfilePage,
	ProfileModal,
	BoardPage,
	MenuPage,
	LoginPage,
	RegisterPage,
	ManageBoardPage,
	GridMenuComponent,
	ModulesPage,
	ModuleRegisterModal,
	PlanPage,
	PlanModal,
	SymbolPage,
	SymbolModal,
	CategoryPage,
	CategoryModal
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
		ModulesService,
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
