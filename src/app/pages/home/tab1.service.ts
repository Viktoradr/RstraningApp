import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map, take } from "rxjs/operators";

import { HttpClient } from "@angular/common/http";
import { ApiProvider } from "src/app/providers/api.provider";

@Injectable({
  providedIn: "root"
})
export class Tab1Service {
  constructor(private api: ApiProvider, private http: HttpClient) {}

  countSolicitacoes(id: string): Observable<any> {
    return this.http.get(this.api.request(`usuario/${id}/solicitacoes/count`)).pipe(
      take(1),
      map(result => result)
    );
  }

  solicitacoes(id: string): Observable<any> {
    return this.http.get(this.api.request(`usuario/${id}/solicitacoes`)).pipe(
      take(1),
      map(result => result)
    );
  }
  
  aceitarSolicitacao(solicitacaoId: string, res: any): Observable<any> {
    return this.http.put(this.api.request(`solicitacao/${solicitacaoId}/aceitar`), res).pipe(
      take(1),
      map(result => result)
    );
  }
}
