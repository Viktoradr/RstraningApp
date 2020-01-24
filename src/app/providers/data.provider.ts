import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class DataProvider {

    private _$USER = "_$user_sd";

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

}
