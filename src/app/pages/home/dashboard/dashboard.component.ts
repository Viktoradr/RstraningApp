import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilProvider } from 'src/app/providers/util.provider';
import { DataProvider } from 'src/app/providers/data.provider';
import { Tab1Service } from '../tab1.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  usuario: any;
  qtdSolicitacao: number = 0;

  constructor(
    private router: Router,
    private util: UtilProvider,
    private dataProvider: DataProvider,
    private service: Tab1Service
  ){
    this.usuario = {};
  }

  ngOnInit() {
    this.dataProvider.getUserAsync()
    .then(user => {
      this.usuario = user;

      this.service.countSolicitacoes(this.usuario.id).subscribe((qtd: number) => {
        this.qtdSolicitacao = qtd;
      }, err => this.qtdSolicitacao = 0);
    })
  }

  sair(){
    this.dataProvider.clearUser();
    this.router.navigate(['../'])
  }
}