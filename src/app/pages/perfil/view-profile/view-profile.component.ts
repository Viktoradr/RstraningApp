import { Component, OnInit } from '@angular/core';
import { DataProvider } from 'src/app/providers/data.provider';
import { UtilProvider } from 'src/app/providers/util.provider';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.scss'],
})
export class ViewProfileComponent implements OnInit {

  nome: string;
  objetivo: string;
  altura: any;
  pesoA: any;
  pesoC: any;
  usuario: any;

  constructor(
    private dataProvider: DataProvider,
    private util: UtilProvider) { 
    this.usuario = {};
  }

  ngOnInit() {
    this.dataProvider.getUserAsync()
    .then(user => {
      this.usuario = user;
      this.nome = user.nome;
      this.altura = user.altura;
      this.pesoA = user.pesoAlvo;
      this.pesoC = user.pesoCorporal;
      this.objetivo = this.util.getDescriptionObjetivo(user.objetivo);
    })
  }

  editar() {
    // this.util.input('Editar', {
    //   altura: this.altura,
    //   pesoCorporal: this.pesoC,
    //   pesoAlvo: this.pesoA
    // }).then((res) => {
    //   if (res) {
    //     this.util.notificar('Atualizado', 'Seus dados foram atualizados com sucesso');
    //   }
    // });
  }

}
