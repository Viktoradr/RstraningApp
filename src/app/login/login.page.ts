import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataProvider } from '../providers/data.provider';
import { CalculosProvider } from '../providers/calculos.provider';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  private formulario: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private usuarioService: UsuarioService,
    private dataProvider: DataProvider,
    private calculosProviders: CalculosProvider
  ) { }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      login: ['victor', Validators.required],
      senha: ['123456', Validators.required]
    });
  }

  logar() {
    if (this.formulario.valid) {
      this.usuarioService.login(this.formulario.value)
        .subscribe(res => {
          
          if (res != undefined) {

            res.proteina = `${this.calculosProviders.proteinaPorDia(res.pesoCorporal, res.nivelAtividade)} g`;
            res.calorias = `${this.calculosProviders.metasDiarias(res.objetivo, res.nivelAtividade, res.idade, res.altura, res.pesoCorporal, res.sexo)} Kcal`
            res.imc = `${this.calculosProviders.imc(res.altura, res.pesoCorporal)}`;
            res.imcCondicao = `${this.calculosProviders.condicaoIMC(res.imc, res.sexo)}`;
            res.sexoDescricao = res.sexo == 1 ? 'M' : 'F';

            console.log(res)

            this.dataProvider.setUser(res);
            this.router.navigate(['../tabs'])
          }
        }, err => {
          alert('Não foi possivel realizar o login')

          if (!err.status) {
            if (err.status == 401) alert('')
            else if (err.status == 404) alert('')
            else if (err.status == 500) alert('')
            else alert('')
          }
        })
    }
  }

  cadastro() {
    this.router.navigate(['../cadastro']);
  }

}
