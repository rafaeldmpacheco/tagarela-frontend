import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { SharedModule } from '../../shared/shared.module';
import { BoardPage } from './board/board';
import { BoardRegisterPage } from './board/board-register/board-register';
import { CategoryPage } from './category/category';
import { CategoryRegister } from './category/category-register/category-register';
import { PlanPage } from './plan/plan';
import { PlanRegister } from './plan/plan-register/plan-register';
import { SymbolPage } from './symbol/symbol';
import { SymbolRegister } from './symbol/symbol-register/symbol-register';

const COMPONENTS = [
  BoardPage,
  BoardRegisterPage,
  PlanPage,
  PlanRegister,
  SymbolPage,
  SymbolRegister,
  CategoryPage,
  CategoryRegister
];

@NgModule({
  imports: [CommonModule, IonicModule, SharedModule],
  declarations: [...COMPONENTS],
  entryComponents: [...COMPONENTS],
  providers: []
})
export class BoardsModule {}
