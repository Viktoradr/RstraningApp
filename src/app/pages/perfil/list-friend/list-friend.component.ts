import { Component, OnInit } from "@angular/core";
import { Tab2Service } from "../tab2.service";

@Component({
  selector: "app-list-friend",
  templateUrl: "./list-friend.component.html",
  styleUrls: ["./list-friend.component.scss"]
})
export class ListFriendComponent implements OnInit {
  usuarios: any[] = [];

  constructor(private service: Tab2Service) {}

  ngOnInit() {
    this.service.usuariosMinify().subscribe(
      (res: any[]) => {
        this.usuarios = res.map((u: any) => {
          u.nome = `${u.nome.split(" ")[0]} ${u.nome.split(" ")[1]}`;
          return u;
        });
        console.log(res);
      },
      err => {}
    );
  }
}
