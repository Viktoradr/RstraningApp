import { ModalController } from '@ionic/angular';
import { Component, OnInit, OnChanges } from "@angular/core";
import { Tab3Service } from "../tab3.service";
import { DataProvider } from "src/app/providers/data.provider";
import { UtilProvider } from 'src/app/providers/util.provider';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { ModalShareSerieComponent } from '../modal-share-serie/modal-share-serie.component';

@Component({
  selector: "app-list-serie",
  templateUrl: "./list-serie.component.html",
  styleUrls: ["./list-serie.component.scss"]
})
export class ListSerieComponent implements OnInit, OnChanges {
  series: any[] = [];

  constructor(
    private service: Tab3Service,
    private util: UtilProvider,
    private router: Router,
    private dataProvider: DataProvider,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    //this.buscar();
  }

  ionViewWillEnter () {
    this.buscar();
  }

  ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
    console.log(changes)
  }

  buscar() {
    this.dataProvider.getUserAsync().then(user => {
      this.service.minhasSeries(user.id)
      .subscribe(
        (res: any[]) => {
          this.series = res.map((s: any) => {
            s.ficha = this.util.getFichaDescription(s.ficha);
            return s;
          });
          console.log(this.series)
        },
        err => {}
      );
    });
  }

  ver(serie: any) {
    this.dataProvider.setSerie(serie);
    this.router.navigate(['tabs/Series/', serie.ficha._id]);
  }

  async share(serie: any) {
    const modal = await this.modalCtrl.create({
      component: ModalShareSerieComponent,
      componentProps: {
        'serieId': serie.id
      }
    });
    return await modal.present();
  }
}
