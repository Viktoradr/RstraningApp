
import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Tab2Service } from '../../perfil/tab2.service';
import { DataProvider } from 'src/app/providers/data.provider';
import { UtilProvider } from 'src/app/providers/util.provider';
import { Tab3Service } from '../tab3.service';

@Component({
  selector: 'app-modal-share-serie',
  templateUrl: './modal-share-serie.component.html',
  styleUrls: ['./modal-share-serie.component.scss'],
})
export class ModalShareSerieComponent implements OnInit {
  
  @Input() serieId: string;
  friends: any[] = [];

  constructor(
    private modalCtrl: ModalController,
    private service: Tab2Service, 
    private service3: Tab3Service, 
    private dataProvider: DataProvider,
    private util: UtilProvider) {}

  ngOnInit() {
    this.dataProvider.getUserAsync()
    .then(user => {
      
      this.service.meusAmigos(user.id).subscribe(
        (res: any[]) => {
          this.friends = res.map((u: any) => {
            u.nome = `${u.nome.split(" ")[0]} ${u.nome.split(" ")[1]}`;
            return u;
          });
        },
        err => {}
      );

    })
  }

  dismiss() {
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }

  compartilhar(friend: any) {
    this.util.ask('Compartilhar', `Você deseja compartilhar a série com ${friend.nome}?`).then((res: boolean) => {
      if (res) {
        this.enviar(friend);
      }
    })
  }

  enviar(friend: any){
    console.log(this.serieId, friend.id)
    this.service3.compartilharSerie(friend.id, this.serie.id).subscribe(
      (res: any[]) => {
     
        
      },
      err => {}
    );

  }
}
