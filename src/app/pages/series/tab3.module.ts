import { IonicModule } from '@ionic/angular';
import { Tab3PageRoutingModule } from './../series/tab3.router.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab3Page } from './tab3.page';
import { AddSerieComponent } from './add-serie/add-serie.component';
import { ListSerieComponent } from './list-serie/list-serie.component';
import { ViewSerieComponent } from './view-serie/view-serie.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    Tab3PageRoutingModule
    // RouterModule.forChild([{ path: '', component: Tab3Page }])
  ],
  declarations: [Tab3Page,
    AddSerieComponent,
    ListSerieComponent,
    ViewSerieComponent
  ]
})
export class Tab3PageModule {}
