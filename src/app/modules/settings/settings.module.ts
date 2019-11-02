import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { ModulesPage } from './modules/modules';
import { SharedModule } from '../../shared/shared.module';
import { ModuleRegister } from './module-register/module-register';

const COMPONENTS = [ModulesPage, ModuleRegister];

@NgModule({
  imports: [CommonModule, IonicModule, SharedModule],
  declarations: [...COMPONENTS],
  entryComponents: [...COMPONENTS],
  providers: []
})
export class SettingsModule {}
