import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Camera } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { Media } from '@ionic-native/media';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicModule } from 'ionic-angular';
import { ColorPickerComponent } from './components/color-picker/color-picker.component';
import { GridMenuComponent } from './components/grid-menu/grid-menu.component';
import { HeaderModalComponent } from './components/header-modal/header-modal.component';
import { BoardService } from './providers/board.service';
import { ExceptionService } from './providers/exception.service';
import { LoadingService } from './providers/loading.service';
import { LoginService } from './providers/login.service';
import { MessageService } from './providers/message.service';
import { ModulesService } from './providers/modules.service';
import { FileService } from './providers/file.service';

const COMPONENTS = [ColorPickerComponent, HeaderModalComponent];
const PAGES = [GridMenuComponent];

@NgModule({
  imports: [CommonModule, IonicModule],
  declarations: [...COMPONENTS, ...PAGES],
  exports: [...COMPONENTS],
  entryComponents: [...PAGES],
  providers: [
    LoadingService,
    MessageService,
    ExceptionService,
    LoginService,
    BoardService,
    ModulesService,
    // IONIC
    StatusBar,
    SplashScreen,
    Media,
    FileTransfer,
    FileTransferObject,
    File,
    Camera,
    FileService
  ]
})
export class SharedModule {}
