import { FormArray } from '@angular/forms';
import { UtilProvider } from "src/app/providers/util.provider";
import { DataProvider } from "src/app/providers/data.provider";
import { Tab3Service } from "./../tab3.service";
import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from '@angular/router';

@Component({
  selector: "app-add-serie",
  templateUrl: "./add-serie.component.html",
  styleUrls: ["./add-serie.component.scss"]
})
export class AddSerieComponent implements OnInit {
  tabSelecionado: any = 0;
  grupo: any = {
    fichas: []
  };

  usuario: any;

  constructor(
    private router: Router,
    private service: Tab3Service,
    private dataProvider: DataProvider,
    private util: UtilProvider
  ) {}

  ngOnInit() {
    this.dataProvider.getUserAsync().then(user => {
      this.usuario = user;
      this.grupo.usuarioId = user.id;
    });
  }

  segmentChanged(event: any) {
    this.tabSelecionado = event.detail.value;
  }

  addFichaA(ficha: any) {
    ficha.exercicios = this.converter(ficha.exercicios as FormArray);
    ficha.tipo = 0;
    this.grupo.fichas[0] = ficha;
  }

  addFichaB(ficha: any) {
    ficha.exercicios = this.converter(ficha.exercicios as FormArray);
    ficha.tipo = 1;
    this.grupo.fichas[1] = ficha;
  }

  addFichaC(ficha: any) {
    ficha.exercicios = this.converter(ficha.exercicios as FormArray);
    ficha.tipo = 2;
    this.grupo.fichas[2] = ficha;
  }

  addFichaD(ficha: any) {
    ficha.exercicios = this.converter(ficha.exercicios as FormArray);
    ficha.tipo = 3;
    this.grupo.fichas[3] = ficha;
  }

  addFichaE(ficha: any) {
    ficha.exercicios = this.converter(ficha.exercicios as FormArray);
    ficha.tipo = 4;
    this.grupo.fichas[4] = ficha;
  }

  converter(exercicios: FormArray) {
    let array = [];

    exercicios.value.forEach((element: any) => {
      array.push(element);
    });

    return array;
  }

  salvarGrupo() {
    console.log(this.grupo);

    if (this.isValid()) {
      this.service.salvarSerie(this.grupo).subscribe(
        res => {
          this.util.notificar("Sucesso", "Série cadastrada com sucesso").then(() => {
            this.router.navigate(['tabs/Series']);
          })
        },
        err => this.util.notificar("Aviso", "Erro ao cadastrar")
      );
    } else this.util.notificar("Aviso", "Adicione pelo menos uma ficha");
  }

  isValid() {
    if (this.grupo.fichas.length < 1) return false;
    else if (this.grupo.usuarioId == undefined || this.grupo.usuarioId == "")
      return false;
    return true;
  }
}
