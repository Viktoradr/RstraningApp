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
              cssClass: 'secondary',
              handler: () => {
                res(false);
              }
            }
          ]
        })
        .then(alert => alert.present());
    });
  }

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
}
