import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { SharedModule } from '../../shared/shared.module';
import { BoardPage } from './board/board';
import { ManageBoardPage } from './board/manage-board/manage-board';
import { CategoryPage } from './category/category';
import { CategoryModal } from './category/category-modal/category-modal';
import { PlanPage } from './plan/plan';
import { PlanModal } from './plan/plan-modal/plan-modal';
import { SymbolPage } from './symbol/symbol';
import { SymbolModal } from './symbol/symbol-modal/symbol-modal';

const COMPONENTS = [
  BoardPage,
  ManageBoardPage,
  PlanPage,
  PlanModal,
  SymbolPage,
  SymbolModal,
  CategoryPage,
  CategoryModal
];

@NgModule({
  imports: [CommonModule, IonicModule, SharedModule],
  declarations: [...COMPONENTS],
  entryComponents: [...COMPONENTS],
  providers: []
})
export class BoardsModule {}
