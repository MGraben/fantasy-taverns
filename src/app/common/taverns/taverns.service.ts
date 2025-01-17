import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie';
import { Identifiers } from '@angular/compiler/src/render3/r3_identifiers';
import { identifierModuleUrl } from '@angular/compiler';

export interface ITavern {
    Id: number;
    TavernName: string;
    
}export interface IMyTavern {
    Id: number;
    TavernName: string;
    
}

console.log("ITavern");
 console.log("In tavern.service for ddl only" );
@Injectable({
    providedIn: 'root',
})
export class TavernsService {
    constructor(private http: HttpClient) {}
    
        getAll(): Observable<ITavern[]> {
            return this.http.get<ITavern[]>('http://localhost:3000/taverns');
        }
    
        getMyAll(): Observable<IMyTavern[]> {
            return this.http.get<IMyTavern[]>('http://localhost:3000/my-taverns');
        }


    

    // create(userName: string, password: string): Observable<ISignupPayload> {
    //     const data: ISignupPayload = {
    //         UserName: userName,
    //         Password: password,
    //         Tavern: {Id: 1, TavernName: "bar"}


    //     };
    //     return this.http
    //         .post<ISignupPayload>('http://localhost:3000/users', data);

    // }

 

    
}


