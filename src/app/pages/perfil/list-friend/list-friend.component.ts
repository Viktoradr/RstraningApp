
import { Component, OnInit } from "@angular/core";
import { Tab2Service } from "../tab2.service";
import { DataProvider } from 'src/app/providers/data.provider';

@Component({
  selector: "app-list-friend",
  templateUrl: "./list-friend.component.html",
  styleUrls: ["./list-friend.component.scss"]
})
export class ListFriendComponent implements OnInit {
  usuarios: any[] = [];

  constructor(private service: Tab2Service, private dataProvider: DataProvider) {}

  ngOnInit() {
    this.dataProvider.getUserAsync()
    .then(user => {
      
      this.service.meusAmigos(user.id).subscribe(
        (res: any[]) => {
          this.usuarios = res.map((u: any) => {
            u.nome = `${u.nome.split(" ")[0]} ${u.nome.split(" ")[1]}`;
            return u;
          });
          console.log(res);
        },
        err => {}
      );

    })
    
  }
}
