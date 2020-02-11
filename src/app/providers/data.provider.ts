import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class DataProvider {

    private _$USER = "_$user_sd";
    private _$SERIE = "_$serie_sd";

    constructor() { }

    getUser() {
        return JSON.parse(atob(localStorage.getItem(this._$USER)));
    }

    setUser(usuario: any) {
        localStorage.setItem(this._$USER, btoa(JSON.stringify(usuario)));
    }

    async getUserAsync() {
        return await this.getUser();
    }

    hasUser() {
        return localStorage.getItem(this._$USER) != null ? true : false;
    }

    clearUser() {
        localStorage.removeItem(this._$USER);
    }

    /*-----------------------------------*/

    getSerie() {
        return JSON.parse(atob(localStorage.getItem(this._$SERIE)));
    }

    setSerie(serie: any) {
        localStorage.setItem(this._$SERIE, btoa(JSON.stringify(serie)));
    }

    async getSerieAsync() {
        return await this.getSerie();
    }

    clearSerie() {
        localStorage.removeItem(this._$SERIE);
    }

}
