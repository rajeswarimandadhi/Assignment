import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { pipe } from 'rxjs';
import {map} from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})
export class ApiService{

  public loginAPIUrl : string = "https://localhost:44340/api/Login/";
  public customerAPIUrl : string = "https://localhost:44340/api/Customer/";
  constructor(private _http : HttpClient) { }

  PostCustomer(data : any){
    return this._http.post<any>(`${this.customerAPIUrl}add_customer`,data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  DeleteCustomer(id : number){
    return this._http.delete<any>(`${this.customerAPIUrl}delete_customer/`+id)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  UpdateCustomer(data : any){
    return this._http.put<any>(`${this.customerAPIUrl}update_customer`,data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  GetCustomers(){
    return this._http.get<any>(`${this.customerAPIUrl}get_all_customers`)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  signUp(cusObj : any){
    //return this._http.post<any>(this.loginAPIUrl+"signup",cusObj)
    return this._http.post<any>(`${this.loginAPIUrl}signup`,cusObj)
  }
  login(cusObj:any){
    return this._http.post<any>(`${this.loginAPIUrl}login`,cusObj)
  }
}

