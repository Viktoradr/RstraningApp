
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Tab1Page } from './tab1.page';
import { ListSolicitacaoComponent } from './list-solicitacao/list-solicitacao.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '', component: Tab1Page,
    children: [
      { path: '', component: DashboardComponent },
      { path: "Solicitacoes", component: ListSolicitacaoComponent },
      { path: '', redirectTo: '/tab1/Home', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class Tab1PageRoutingModule {}
