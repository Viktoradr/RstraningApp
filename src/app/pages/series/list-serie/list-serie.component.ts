import { Component, OnInit, OnChanges } from "@angular/core";
import { Tab3Service } from "../tab3.service";
import { DataProvider } from "src/app/providers/data.provider";

@Component({
  selector: "app-list-serie",
  templateUrl: "./list-serie.component.html",
  styleUrls: ["./list-serie.component.scss"]
})
export class ListSerieComponent implements OnInit, OnChanges {
  series: any[] = [];

  constructor(
    private service: Tab3Service,
    private dataProvider: DataProvider
  ) {}

  ngOnInit() {
    this.buscar();
  }

  ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
    this.buscar();
  }

  buscar() {
    this.dataProvider.getUserAsync().then(user => {
      this.service.minhasSeries(user.id).subscribe(
        (res: any[]) => {
          this.series = res.map((s: any) => {
            switch (s.ficha.tipo) {
              case 0:
                s.ficha.sigla = "A";
                s.ficha.tipoDescricao = "Série A";
                break;
              case 1:
                s.ficha.sigla = "B";
                s.ficha.tipoDescricao = "Série B";
                break;
              case 2:
                s.ficha.sigla = "C";
                s.ficha.tipoDescricao = "Série C";
                break;
              case 3:
                s.ficha.sigla = "D";
                s.ficha.tipoDescricao = "Série D";
                break;
              case 4:
                s.ficha.sigla = "E";
                s.ficha.tipoDescricao = "Série E";
                break;

              default:
                s.ficha.sigla = "A";
                s.ficha.tipoDescricao = "Série A";
                break;
            }

            return s;
          });
          console.log(res);
        },
        err => {}
      );
    });
  }
}
