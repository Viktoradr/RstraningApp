import { IonicModule } from "@ionic/angular";
import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Tab1PageRoutingModule } from './tab1.router.module';
import { Tab1Page } from "./tab1.page";
import { ListSolicitacaoComponent } from './list-solicitacao/list-solicitacao.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    Tab1PageRoutingModule
  ],
  declarations: [
    Tab1Page,
    DashboardComponent,
    ListSolicitacaoComponent
  ]
})
export class Tab1PageModule {}
