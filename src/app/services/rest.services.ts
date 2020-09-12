import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RestService {
  idtoken: any

  constructor(private http: HttpClient) {
  }

  setToken(token: string) {
    console.log("Setting token...", token)
   // this.idtoken="eyJhbGciOiJSUzI1NiIsImtpZCI6IjEyODA5ZGQyMzlkMjRiZDM3OWMwYWQxOTFmOGIwZWRjZGI5ZDM5MTQiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiRGV2aSBQcml5YSIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS0vQU9oMTRHamZYcWZNc19rSlJiRndSRTZ3TDhEb0Vfb2o3MmFrOG9lNlBNWVNlZz1zOTYtYyIsImlzcyI6Imh0dHBzOi8vc2VjdXJldG9rZW4uZ29vZ2xlLmNvbS9jcnlwdG9hbGx5LTYwNDBmIiwiYXVkIjoiY3J5cHRvYWxseS02MDQwZiIsImF1dGhfdGltZSI6MTU5ODUxMDMwMywidXNlcl9pZCI6ImJDZmI1SFRjU1NVOE9FQnhTV29waHM1bVVVdTEiLCJzdWIiOiJiQ2ZiNUhUY1NTVThPRUJ4U1dvcGhzNW1VVXUxIiwiaWF0IjoxNTk4NTIyNzQ3LCJleHAiOjE1OTg1MjYzNDcsImVtYWlsIjoiZGV2aXByaXlhcHVAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZ29vZ2xlLmNvbSI6WyIxMDcwNjY1Njg2ODk5MzA5MjMyNzYiXSwiZW1haWwiOlsiZGV2aXByaXlhcHVAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoiZ29vZ2xlLmNvbSJ9fQ.MaV-PIAj8LIti1Afq_hpPOKtjLEz2B3iyHIMXMNj90X8gSkrq7SiEQkgJL9LusFN-WzdbXcxvMuBksTbOmT0lxH6OCp4-nUToqNdJIyc30FTHke1LtW5UqXNXXs3ajx2vx3gidnfLtFziCkEDkG_6IfETQVttcmbTdRdDhMN92Sztjbm9bTmQGIQumYAFrt8C_wFweQUQFV-vtU9XOKzXsbObNwXpwzYS0lo6L3A08pBUHY-keR1AI6HKw-JutuXsX7U3Hx1lfrRQX7Qg2ZzMAONxKm1KhXaPXF37KDXHH-wXJ1ckPZuCXeSzUce-fzBTf2UVzeZ_IPg5W5t5HLaHA"
   //this.idtoken = token
  }
  /**
   * Http post calls
   */
  post(url: string, payload: any) {
    //console.log("Payload")
    //console.log(payload)
    return this.http.post(url,payload,{ 
      //headers: new HttpHeaders({'x-auth-header': this.idtoken})
    });
  }

  /**
   * Http get calls
   */
  get(url: string) {
    return this.http.get(url,{ 
      //headers: new HttpHeaders({'x-auth-header': this.idtoken})
    });
  }
}
