import { IonicModule } from '@ionic/angular';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Tab2PageRoutingModule } from './tab2.router.module';
import { Tab2Page } from './tab2.page';
import { ViewFriendComponent } from './view-friend/view-friend.component';
import { ViewProfileComponent } from './view-profile/view-profile.component';
import { ListFriendComponent } from './list-friend/list-friend.component';
import { AddFriendComponent } from './add-friend/add-friend.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    Tab2PageRoutingModule
    // RouterModule.forChild([{ path: '', component: Tab2Page }])
  ],
  declarations: [
    Tab2Page,
    ViewFriendComponent,
    ListFriendComponent,
    ViewProfileComponent,
    AddFriendComponent
  ]
})
export class Tab2PageModule {}
