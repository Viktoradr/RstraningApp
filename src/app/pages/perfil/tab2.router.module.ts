
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Tab2Page } from './tab2.page';
import { ViewFriendComponent } from './view-friend/view-friend.component';
import { ViewProfileComponent } from './view-profile/view-profile.component';
import { ListFriendComponent } from './list-friend/list-friend.component';
import { AddFriendComponent } from './add-friend/add-friend.component';

const routes: Routes = [
  {
    path: '', component: Tab2Page,
    children: [
      { path: '', component: ViewProfileComponent },
      { path: 'Amigos', component: ListFriendComponent },
      { path: 'Amigos/Add', component: AddFriendComponent },
      { path: 'Amigos/:id', component: ViewFriendComponent },
      { path: '', redirectTo: '/tab2/Perfil', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class Tab2PageRoutingModule {}
