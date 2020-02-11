import { AlertController, ModalController } from '@ionic/angular';
import { DataProvider } from 'src/app/providers/data.provider';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { UtilProvider } from 'src/app/providers/util.provider';
import { Tab3Service } from '../tab3.service';
import { Router } from '@angular/router';
import { ModalShareSerieComponent } from '../modal-share-serie/modal-share-serie.component';

@Component({
  selector: 'app-view-serie',
  templateUrl: './view-serie.component.html',
  styleUrls: ['./view-serie.component.scss'],
})
export class ViewSerieComponent implements OnInit, OnDestroy {

  exercicios: any[] = [];
  tipo: string;
  dataCriacao: any;
  nome: string;
  serieId: string;
  fichaId: string;

  constructor(
    private service: Tab3Service,
    private provider: DataProvider,
    private util: UtilProvider,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {
    this.provider.getSerieAsync().then(serie => {
      serie.ficha = this.util.getFichaDescription(serie.ficha);
      this.serieId = serie.id;
      this.fichaId = serie.ficha._id;
      this.tipo = serie.ficha.tipoDescricao;
      this.dataCriacao = serie.ficha.dataCriacao;
      this.nome = serie.ficha.descricao;
      this.exercicios = serie.ficha.exercicios;
    })
  }

  ngOnDestroy(): void {
    this.provider.clearSerie();
  }

  editar(ex: any, index: number) {
    const alert = this.alertCtrl
    .create({
      header: 'Editar Exercício',
      inputs: [
        {
          name: "exercicio",
          type: "text",
          placeholder: "Nome do exercício",
          value: ex.exercicio
        },
        {
          name: "series",
          type: "text",
          placeholder: "Qtd Séries",
          value: ex.series
        },
        {
          name: "repeticoes",
          type: "text",
          placeholder: "Qtd Rep",
          value: ex.repeticoes
        },
        {
          name: "carga",
          type: "text",
          placeholder: "Carga",
          value: ex.carga
        },
        {
          name: "observacao",
          type: "text",
          placeholder: "Observação",
          value: ex.observacao
        }
      ],
      buttons: [
        {
          text: "Ok",
          handler: (d) => { 

            let exercicios: Array<any> = this.util.clonar(this.exercicios);

            exercicios[index] = {
              _id: ex._id,
              exercicio: d.exercicio,
              series: d.series,
              repeticoes: d.repeticoes,
              carga: d.carga,
              observacao: d.observacao
            };

            console.log(exercicios)

              this.service.updateFicha(this.serieId, {
                fichaId: this.fichaId,
                exercicios: exercicios,
                descricao: this.nome
              }).subscribe((res) => {
                if (res) {
                  this.exercicios[index].exercicio = d.exercicio,
                  this.exercicios[index].series = d.series,
                  this.exercicios[index].repeticoes = d.repeticoes,
                  this.exercicios[index].carga = d.carga,
                  this.exercicios[index].observacao = d.observacao
                }
              }, err => {});
          }
        },
        {
          text: "Cancel",
          role: "cancel",
          cssClass: "secondary",
          handler: () => { }
        }
      ]
    }).then(alert => alert.present());
  }

  async share() {
    const modal = await this.modalCtrl.create({
      component: ModalShareSerieComponent
    });
    return await modal.present();
  }
}
