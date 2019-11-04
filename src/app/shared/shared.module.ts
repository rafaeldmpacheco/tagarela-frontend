import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Camera } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { Media } from '@ionic-native/media';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicModule } from 'ionic-angular';
import { AudioRecorderComponent } from './components/audio-recorder/audio-recorder.component';
import { ColorPickerComponent } from './components/color-picker/color-picker.component';
import { GridMenuComponent } from './components/grid-menu/grid-menu.component';
import { TemplateModalRegisterComponent } from './components/template-modal-register/template-modal-register.component';
import { BoardService } from './providers/board.service';
import { ExceptionService } from './providers/exception.service';
import { FileService } from './providers/file.service';
import { LoadingService } from './providers/loading.service';
import { LoginService } from './providers/login.service';
import { MessageService } from './providers/message.service';
import { ModulesService } from './providers/modules.service';
import { ImageGalleryComponent } from './components/image-gallery/image-gallery.component';
import { AlertMessageComponent } from './components/alert-message/alert-message.component';

const COMPONENTS = [
  ColorPickerComponent,
  TemplateModalRegisterComponent,
  AudioRecorderComponent,
  ImageGalleryComponent,
  AlertMessageComponent
];
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
