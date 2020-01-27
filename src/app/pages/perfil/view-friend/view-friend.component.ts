import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Tab2Service } from './../tab2.service';
import { take } from 'rxjs/operators';
import { UtilProvider } from 'src/app/providers/util.provider';

@Component({
  selector: 'app-view-friend',
  templateUrl: './view-friend.component.html',
  styleUrls: ['./view-friend.component.scss'],
})
export class ViewFriendComponent implements OnInit {

  nome: string;
  objetivo: string;
  sexo: string;

  constructor(
    private service: Tab2Service,
    private activateRoute: ActivatedRoute,
    private util: UtilProvider
  ) { }

  ngOnInit() {

    this.activateRoute.params.pipe(take(1)).subscribe((params: any) => {
      if (params) {
        
        this.service.usuarioPorId(params['id']).pipe(take(1)).subscribe((res: any) => {
          
          this.nome = res.nome;
          this.objetivo = this.util.getDescriptionObjetivo(res.objetivo);
          this.sexo = res.sexo == 1 ? "M" : "F";

        }, err => {})
      }
    })

    
  }

}
