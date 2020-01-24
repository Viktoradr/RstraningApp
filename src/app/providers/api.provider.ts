import { environment } from 'src/environments/environment';
import { HttpHeaders } from '@angular/common/http';
import { DataProvider } from './data.provider';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ApiProvider {

    constructor(
        private storage: DataProvider
    ) { }

    request(controller: string, params?: any) {
        let _url = environment.baseUrl + controller;
        return this.getParams(_url, params);
    }

    getParams(endpoint: string, params?: any) {
        for (let k in params) {
            endpoint += `/${params[k]}`; 
        };
        return endpoint;
    }

    getHeader() {
        const _usuario: any = this.storage.getUser();
        let headers = {
            headers: new HttpHeaders()
                .set('Authorization', _usuario.Token)
                .set('Content-Type', 'application/json')
        };
        return headers;
    }

    getAutorization() {
        const _usuario: any = this.storage.getUser();
        return _usuario.Token;
    }
}