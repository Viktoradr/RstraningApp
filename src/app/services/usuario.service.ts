import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { ApiProvider } from '../providers/api.provider';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  _CONTROLLER = 'usuario';
  _METHODS = {
    autenticar: 'autenticar',
    add: 'add'
  }

  constructor(
    private api: ApiProvider,
    private http: HttpClient
  ) { }

  login(usuario: any): Observable<any> {
    return this.http.post(this.api.request(this._METHODS.autenticar), usuario)
      .pipe(
        take(1),
        map(result => result)
      );
  }

  cadastrar(usuario: any): Observable<any> {
    return this.http.post(this.api.request('usuario/add'), usuario)
      .pipe(
        take(1),
        map(result => result)
      );
  }
}
