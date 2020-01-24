import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  { path: '', component: TabsPage,
    children: [
      { path: '', redirectTo: '/tabs/Home', pathMatch: 'full' },
      { path: 'Home', loadChildren: '../pages/home/tab1.module#Tab1PageModule' },
      { path: 'Perfil', loadChildren: '../pages/perfil/tab2.module#Tab2PageModule' },
      { path: 'Series', loadChildren: '../pages/series/tab3.module#Tab3PageModule' },
      { path: 'Utilitarios',  loadChildren: '../pages/utilitarios/tab4.module#Tab4PageModule' }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
