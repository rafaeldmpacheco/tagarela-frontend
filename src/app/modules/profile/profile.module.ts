import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { InviteUserPage } from './invite-user/invite-user';
import { ProfilePage } from './profile';
import { SharedModule } from '../../shared/shared.module';

const COMPONENTS = [ProfilePage, InviteUserPage];

@NgModule({
  imports: [CommonModule, IonicModule, SharedModule],
  declarations: [...COMPONENTS],
  entryComponents: [...COMPONENTS],
  providers: []
})
export class ProfileModule {}
