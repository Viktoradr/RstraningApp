
import { Component, OnInit } from '@angular/core';
import { Tab2Service } from '../tab2.service';
import { UtilProvider } from 'src/app/providers/util.provider';
import { DataProvider } from 'src/app/providers/data.provider';

@Component({
  selector: 'app-add-friend',
  templateUrl: './add-friend.component.html',
  styleUrls: ['./add-friend.component.scss'],
})
export class AddFriendComponent implements OnInit {
  usuarios: any[] = [];
  usuario: any;

  constructor(private service: Tab2Service, private util: UtilProvider, private dataProvider: DataProvider) {}

  ngOnInit() {
    this.dataProvider.getUserAsync()
    .then(user => {
      this.usuario = user;
    });
  }

  buscar(event: any) { 
    //console.log(event.srcElement.value)
    const str = event.srcElement.value;
    
    if (str != '') {
      this.service.searchForAdd(str).subscribe(
        (res: any[]) => {
          this.usuarios = res.map((u: any) => {
            u.nome = `${u.nome.split(" ")[0]} ${u.nome.split(" ")[1]}`;
            return u;
          });
        },
        err => {}
      );
    }
    else this.usuarios = [];
  }

  adicionar(friend: any) {
    this.util.ask('Adicionar', 'Deseja realmente enviar uma solicitação de amizade para esta pessoa?').then((res:boolean) => {
      if (res) {
        this.util.loading();

        const solicitacao = {
          friendId: friend.id,
          userId: this.usuario.id,
        };

        this.service.enviarSolicitacaoAmizade(solicitacao).subscribe((res) => {
          this.util.loadingDimiss();
          
          if (res) 
            this.util.notificar('Concluído', 'Solicitação realizada com sucesso').then(() => {})
          
        }, err => this.util.loadingDimiss());
      }
    })
  }

}
