import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';
import { DataProvider } from '../providers/data.provider';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {
  private formulario: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private usuarioService: UsuarioService,
    private dataProvider: DataProvider,
  ) { }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      login: ['victor', Validators.required],
      senha: ['123456', Validators.required]
    });
  }

  prosseguir() {
    if (this.formulario.valid) {
      this.usuarioService.login(this.formulario.value)
        .subscribe(res => {
          
          if (res != undefined) {
            console.log(res)
          }
        }, err => {
          alert('Não foi possivel realizar o cadastro')

          if (!err.status) {
            if (err.status == 401) alert('')
            else if (err.status == 404) alert('')
            else if (err.status == 500) alert('')
            else alert('')
          }
        })
    }
  }

}
