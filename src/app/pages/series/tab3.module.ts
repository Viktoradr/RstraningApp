import { IonicModule } from '@ionic/angular';
import { Tab3PageRoutingModule } from './../series/tab3.router.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Tab3Page } from './tab3.page';
import { AddSerieComponent } from './add-serie/add-serie.component';
import { ListSerieComponent } from './list-serie/list-serie.component';
import { ViewSerieComponent } from './view-serie/view-serie.component';
import { FormFichaComponent } from './form-ficha/form-ficha.component';
import { ModalShareSerieComponent } from './modal-share-serie/modal-share-serie.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    Tab3PageRoutingModule
  ],
  declarations: [
    Tab3Page,
    AddSerieComponent,
    ListSerieComponent,
    ViewSerieComponent,
    FormFichaComponent,
    ModalShareSerieComponent
  ],
  entryComponents: [ModalShareSerieComponent]
})
export class Tab3PageModule {}