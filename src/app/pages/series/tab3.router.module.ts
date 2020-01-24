import { ListSerieComponent } from './list-serie/list-serie.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Tab3Page } from './tab3.page';
import { AddSerieComponent } from './add-serie/add-serie.component';
import { ViewSerieComponent } from './view-serie/view-serie.component';

const routes: Routes = [
  {
    path: '', component: Tab3Page,
    children: [
      { path: '', component: ListSerieComponent },
      { path: 'Add', component: AddSerieComponent },
      { path: ':id', component: ViewSerieComponent },
      { path: '', redirectTo: '/tab3/Series', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class Tab3PageRoutingModule {}
