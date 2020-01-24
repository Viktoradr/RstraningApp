import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { UsuarioService } from "../services/usuario.service";
import { UtilProvider } from "../providers/util.provider";

@Component({
  selector: "app-cadastro",
  templateUrl: "./cadastro.page.html",
  styleUrls: ["./cadastro.page.scss"]
})
export class CadastroPage implements OnInit {
  formulario: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private usuarioService: UsuarioService,
    private util: UtilProvider
  ) {}

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      nome: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      login: [null, Validators.required],
      senha: [null, Validators.required],
      perfilId: [null, Validators.required],
      objetivo: [null, Validators.required],
      nivelAtividade: [null, Validators.required],
      idade: [null, Validators.required],
      sexo: [null, Validators.required],
      altura: [null, Validators.required],
      pesoCorporal: [null, Validators.required],
      pesoAlvo: [null, Validators.required]
    });
  }

  prosseguir() {
    if (this.formulario.valid) {
      this.util.loading();

      const obj = {
        nome: this.formulario.get("nome").value,
        email: this.formulario.get("email").value,
        login: this.formulario.get("login").value,
        senha: this.formulario.get("senha").value,
        perfilId: this.formulario.get("perfilId").value,
        objetivo: Number.parseInt(this.formulario.get("objetivo").value),
        nivelAtividade: Number.parseFloat(
          this.formulario.get("nivelAtividade").value
        ),
        idade: Number.parseInt(this.formulario.get("idade").value),
        sexo: Number.parseInt(this.formulario.get("sexo").value),
        altura: Number.parseFloat(this.formulario.get("altura").value),
        pesoCorporal: Number.parseFloat(
          this.formulario.get("pesoCorporal").value
        ),
        pesoAlvo: Number.parseFloat(this.formulario.get("pesoAlvo").value)
      };

      this.usuarioService.cadastrar(obj).subscribe(
        res => {
          if (res != undefined)
            this.util.notificar("Cadastrado", "Cadastro realizado com sucesso").then((res) => {
              this.router
                  .navigate(["../login"])
                  .then(() => this.util.loadingDimiss());
            });
          else this.util.loadingDimiss();
        },
        err => {
          this.util.loadingDimiss();

          if (!err.status && err.status == 401)
            this.util.notificar("Erro", "Não foi possivel realizar o cadastro");
          else
            this.util.notificar(
              "Erro",
              `Não foi possivel realizar o login - ${err.message}`
            );
        }
      );
    } else this.util.notificar("Aviso", "Campos Obrigatórios");
  }
}
