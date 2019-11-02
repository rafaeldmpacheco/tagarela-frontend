import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { SharedModule } from '../../shared/shared.module';
import { LoginPage } from './login/login';
import { RegisterPage } from './register/register';

const COMPONENTS = [RegisterPage, LoginPage];

@NgModule({
  imports: [CommonModule, IonicModule, SharedModule],
  declarations: [...COMPONENTS],
  entryComponents: [...COMPONENTS],
  providers: []
})
export class AuthModule {}
