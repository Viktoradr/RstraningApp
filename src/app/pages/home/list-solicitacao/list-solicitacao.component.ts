import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilProvider } from 'src/app/providers/util.provider';
import { DataProvider } from 'src/app/providers/data.provider';
import { Tab1Service } from '../tab1.service';

@Component({
  selector: 'app-list-solicitacao',
  templateUrl: './list-solicitacao.component.html',
  styleUrls: ['./list-solicitacao.component.scss'],
})
export class ListSolicitacaoComponent implements OnInit {
  usuario: any;
  solicitacoes: any[] = [];

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

      this.service.solicitacoes(this.usuario.id).subscribe((res: any[]) => {        
        this.solicitacoes = res.map((u: any) => {
          u.nome = `${u.nome.split(" ")[0]} ${u.nome.split(" ")[1]}`;
          return u;
        });
      }, err => this.solicitacoes = []);
    })
  }

  acao(solicitacao: any, status: boolean) {
    this.util.loading();

    this.service.aceitarSolicitacao(solicitacao.id, {
      aceito: status
    }).subscribe((res: boolean) => {        
      this.util.loadingDimiss();

      if (res) {
        this.util.notificar('Parabéns', `Você e o/a ${solicitacao.nome} agora são amigos`).then(() => {
          this.solicitacoes.splice(
            this.solicitacoes.findIndex(x => x.id = solicitacao.id), 1
          )
        });
      }
      else this.util.notificar('Aviso', 'Um erro ocorreu, tente novamente');
      
    }, err => this.util.loadingDimiss());
  }

}
