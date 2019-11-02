import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { MenuPage } from './core/menu/menu';
import { TokenInterceptor } from './core/providers/intercept-http.service';
import { AuthModule } from './modules/auth/auth.module';
import { BoardsModule } from './modules/boards/boards.module';
import { ProfileModule } from './modules/profile/profile.module';
import { SettingsModule } from './modules/settings/settings.module';
import { SharedModule } from './shared/shared.module';

const PAGES = [MyApp, MenuPage];
@NgModule({
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    SharedModule,
    ProfileModule,
    SettingsModule,
    AuthModule,
    BoardsModule
  ],
  bootstrap: [IonicApp],
  declarations: [...PAGES],
  entryComponents: [...PAGES],
  providers: [
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
