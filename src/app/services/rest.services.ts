import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RestService {
  sessionToken: any

  constructor(private http: HttpClient) {
  }

  /**
   * Http post calls
   */
  postwo(url: string, payload: any) {
    return this.http.post(url, payload, {
      //headers: new HttpHeaders({'x-auth-header': this.idtoken})
    });
  }


  post(url: string, payload: any) {
    return this.http.post(url, payload, {
      headers: new HttpHeaders({ 'x-auth-header': this.sessionToken })

    });

  }
  /**
   * Http get calls
   */
  get(url: string) {
    this.sessionToken = sessionStorage.getItem('sessionToken')

    return this.http.get(url, {
      headers: new HttpHeaders({ 'x-auth-header': this.sessionToken })
    });
  }
}
