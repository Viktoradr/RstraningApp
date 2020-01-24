import { Component, OnInit } from "@angular/core";
import { UsuarioService } from "../services/usuario.service";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DataProvider } from "../providers/data.provider";
import { CalculosProvider } from "../providers/calculos.provider";
import { UtilProvider } from '../providers/util.provider';

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"]
})
export class LoginPage implements OnInit {
  formulario: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private usuarioService: UsuarioService,
    private dataProvider: DataProvider,
    private calculosProviders: CalculosProvider,
    private util: UtilProvider,
  ) {}

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      login: ["vrodrigues", Validators.required],
      senha: ["123456", Validators.required]
    });
  }

  logar() {
    if (this.formulario.valid) {
      this.util.loading();

      this.usuarioService.login(this.formulario.value).subscribe(
        res => {
          if (res != undefined) {
            res.proteina = `${this.calculosProviders.proteinaPorDia(
              res.pesoCorporal,
              res.nivelAtividade
            )} g`;
            res.calorias = `${this.calculosProviders.metasDiarias(
              res.objetivo,
              res.nivelAtividade,
              res.idade,
              res.altura,
              res.pesoCorporal,
              res.sexo
            )} Kcal`;
            res.imc = `${this.calculosProviders.imc(
              res.altura,
              res.pesoCorporal
            )}`;
            res.imcCondicao = `${this.calculosProviders.condicaoIMC(
              res.imc,
              res.sexo
            )}`;
            res.sexoDescricao = res.sexo == 1 ? "M" : "F";
              console.log(res)
            this.dataProvider.setUser(res);
            this.router
              .navigate(["../tabs"])
              .then(() => this.util.loadingDimiss());
          } else this.util.loadingDimiss();
        },
        err => {
          this.util.loadingDimiss();
          if (!err.status && err.status == 401)
            this.util.notificar("Erro", "Não foi possivel realizar o login");
          else
            this.util.notificar(
              "Erro",
              `Não foi possivel realizar o login - ${err.message}`
            );
        }
      );
    }
  }

  cadastro() {
    this.router.navigate(["../cadastro"]);
  }
}
