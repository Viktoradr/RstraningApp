import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { UtilProvider } from './../../../providers/util.provider';

@Component({
  selector: 'form-ficha',
  templateUrl: './form-ficha.component.html',
  styleUrls: ['./form-ficha.component.scss'],
})
export class FormFichaComponent implements OnInit{

  @Output('ficha') ficha: EventEmitter<any>;

  formulario: FormGroup;
  exercicios: any[] = [];

  constructor(
    private fb: FormBuilder,
    private util: UtilProvider,
    private alertCtrl: AlertController) { 
      this.ficha = new EventEmitter<any>()
    }

  ngOnInit() {
    this.formulario = this.fb.group({
      descricao: [null],
      tipo: [null],
      exercicios: [this.fb.array([])]
    });
  }

  isValid() {
    var array = this.formulario.get('exercicios').value as FormArray;
    return array.length > 0;
  }

  changeDescricao() {
    if (this.isValid()) {
      this.ficha.emit(this.formulario.value);
    }
  }

  addExercicio(){
    const alert = this.alertCtrl
    .create({
      header: 'Adicionar Novo Exercício',
      inputs: [
        {
          name: "exercicio",
          type: "text",
          placeholder: "Nome do exercício"
        },
        {
          name: "series",
          type: "text",
          placeholder: "Qtd Séries"
        },
        {
          name: "repeticoes",
          type: "text",
          placeholder: "Qtd Rep"
        },
        {
          name: "carga",
          type: "text",
          placeholder: "Carga"
        },
        {
          name: "observacao",
          type: "text",
          placeholder: "Observação"
        }
      ],
      buttons: [
        {
          text: "Ok",
          handler: (d) => { 
            this.exercicios.push(d);
            
            let array = this.formulario.get('exercicios').value as FormArray;
            array.push(this.fb.group({
              exercicio: [d.exercicio],
              series: [d.series],
              repeticoes: [d.repeticoes],
              carga: [d.carga],
              observacao: [d.observacao]
            }));

            this.ficha.emit(this.formulario.value);
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
}
