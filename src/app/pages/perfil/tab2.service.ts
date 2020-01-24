import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { HttpClient } from '@angular/common/http';
import { ApiProvider } from 'src/app/providers/api.provider';

@Injectable({
  providedIn: 'root'
})
export class Tab2Service {
  constructor(
    private api: ApiProvider,
    private http: HttpClient
  ) { }

  usuariosMinify(): Observable<any> {
    return this.http.get(this.api.request('usuarios/minify'))
      .pipe(
        take(1),
        map(result => result)
      );
  }

  usuarioPorId(id: string): Observable<any> {
    return this.http.get(this.api.request('usuario', {param: id}))
      .pipe(
        take(1),
        map(result => result)
      );
  }
//   cadastrar(usuario: any): Observable<any> {
//     return this.http.post(this.api.request('usuario/add'), usuario)
//       .pipe(
//         take(1),
//         map(result => result)
//       );
//   }
}
