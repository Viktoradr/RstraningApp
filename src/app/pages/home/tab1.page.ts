import { Component, OnInit } from '@angular/core';
import { DataProvider } from 'src/app/providers/data.provider';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  usuario: any;

  constructor(
    private router: Router,
    private dataProvider: DataProvider,
  ){
    this.usuario = {};
  }

  ngOnInit() {
    this.dataProvider.getUserAsync()
    .then(user => this.usuario = user)
  }

  sair(){
    this.dataProvider.clearUser();
    this.router.navigate(['../'])
  }

  verFichaDoDia(){}
}
