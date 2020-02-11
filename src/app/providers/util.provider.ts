import { Injectable } from "@angular/core";
import { AlertController, LoadingController } from "@ionic/angular";

@Injectable({
  providedIn: "root"
})
export class UtilProvider {
  constructor(
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController
  ) {}

  notificar(header: string, message: string) {
    return new Promise((res, reject) => {
      this.alertCtrl
        .create({
          header: header,
          message: message,
          buttons: [
            {
              text: "Ok",
              handler: () => {
                res(true);
              }
            }
          ]
        })
        .then(alert => alert.present());
    });
  }

  ask(header: string, message: string) {
    return new Promise((res, reject) => {
      this.alertCtrl
        .create({
          header: header,
          message: message,
          buttons: [
            {
              text: "Ok",
              handler: () => {
                res(true);
              }
            },
            {
              text: "Cancel",
              role: "cancel",
              cssClass: "secondary",
              handler: () => {
                res(false);
              }
            }
          ]
        })
        .then(alert => alert.present());
    });
  }

  // input(header: string, obj: any) {
  //   return new Promise((res, reject) => {
  //     const alert = thialertCtrl
  //       .create({
  //         header: header,
  //         inputs: [
  //           // {
  //           //   name: "name1",
  //           //   type: "text",
  //           //   placeholder: "Placeholder 1"
  //           // },
  //           // {
  //           //   name: "name2",
  //           //   type: "text",
  //           //   id: "name2-id",
  //           //   value: "hello",
  //           //   placeholder: "Placeholder 2"
  //           // },
  //           // {
  //           //   name: "name3",
  //           //   value: "http://ionicframework.com",
  //           //   type: "url",
  //           //   placeholder: "Favorite site ever"
  //           // },
  //           // // input date with min & max
  //           // {
  //           //   name: "name4",
  //           //   type: "date",
  //           //   min: "2017-03-01",
  //           //   max: "2018-01-12"
  //           // },
  //           // input date without min nor max
  //           // {
  //           //   name: "name5",
  //           //   type: "date"
  //           // },
  //           {
  //             name: "altura",
  //             type: "number",
  //             placeholder: "Altura",
  //             value: obj["altura"],
  //             label: "Altura",
  //             id: "inptAltura"
  //           },
  //           {
  //             name: "peso",
  //             type: "number",
  //             placeholder: "Peso",
  //             value: obj["pesoCorporal"],
  //             label: "Peso",
  //             id: "inptPeso"
  //           },
  //           {
  //             name: "alvo",
  //             type: "number",
  //             placeholder: "Alvo",
  //             value: obj["pesoAlvo"],
  //             label: "Alvo",
  //             id: "inptAlvo"
  //           }
  //         ],
  //         buttons: [
  //           {
  //             text: "Ok",
  //             handler: () => {
  //               res(true);
  //             }
  //           },
  //           {
  //             text: "Cancel",
  //             role: "cancel",
  //             cssClass: "secondary",
  //             handler: () => {
  //               res(false);
  //             }
  //           }
  //         ]
  //       })
  //       .then(alert => alert.present());
  //   });
  // }

  loading() {
    this.loadingCtrl
      .create({
        spinner: null,
        duration: 5000,
        message: "Please wait...",
        translucent: true,
        cssClass: "custom-class custom-loading"
      })
      .then(loading => loading.present());
  }

  loadingDimiss() {
    this.loadingCtrl.dismiss();
  }

  clonar(obj: any) {
    return JSON.parse(JSON.stringify(obj));
  }

  getDescriptionObjetivo(num: number) {
    switch (num) {
      case 0:
        return "Emagrecer";
      case 1:
        return "Ganhar Massa Muscular";
      case 2:
        return "Manter o Peso";
      default:
        return "Emagrecer";
    }
  }

  getFichaDescription(ficha: any) {
    switch (ficha.tipo) {
      case 0:
        ficha.sigla = "A";
        ficha.tipoDescricao = "Série A";
        break;
      case 1:
        ficha.sigla = "B";
        ficha.tipoDescricao = "Série B";
        break;
      case 2:
        ficha.sigla = "C";
        ficha.tipoDescricao = "Série C";
        break;
      case 3:
        ficha.sigla = "D";
        ficha.tipoDescricao = "Série D";
        break;
      case 4:
        ficha.sigla = "E";
        ficha.tipoDescricao = "Série E";
        break;

      default:
        ficha.sigla = "A";
        ficha.tipoDescricao = "Série A";
        break;
    }
    return ficha;
  }
}
