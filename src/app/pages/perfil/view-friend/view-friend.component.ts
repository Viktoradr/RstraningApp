import { ActivatedRoute } from '@angular/router';

import { Component, OnInit } from '@angular/core';
import { Tab2Service } from './../tab2.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-view-friend',
  templateUrl: './view-friend.component.html',
  styleUrls: ['./view-friend.component.scss'],
})
export class ViewFriendComponent implements OnInit {

  friend: any = {};

  constructor(
    private service: Tab2Service,
    private activateRoute: ActivatedRoute
  ) { }

  ngOnInit() {

    this.activateRoute.params.pipe(take(1)).subscribe((params: any) => {
      if (params) {
        
        this.service.usuarioPorId(params['id']).pipe(take(1)).subscribe((res: any) => {
          
          this.friend = res;
          
        }, err => {})
      }
    })

    
  }

}
