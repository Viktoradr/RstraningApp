import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { HttpClient } from '@angular/common/http';
import { ApiProvider } from 'src/app/providers/api.provider';

@Injectable({
  providedIn: 'root'
})
export class Tab3Service {
  constructor(
    private api: ApiProvider,
    private http: HttpClient
  ) { }

  minhasSeries(id: string): Observable<any> {
    return this.http.get(this.api.request(`series/${id}`))
      .pipe(
        take(1),
        map(result => result)
      );
  }

  salvarSerie(serie: any): Observable<any> {
    return this.http.post(this.api.request(`serie/add`), serie)
      .pipe(
        take(1),
        map(result => result)
      );
  }

}
