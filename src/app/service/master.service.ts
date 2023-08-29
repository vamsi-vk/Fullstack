import { Injectable } from '@angular/core';
import { colorentity } from '../Entity/colorentity';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { Country, Customer } from '../Model/Customer';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  constructor(private http: HttpClient) { }

  GetColorList(): colorentity[] {
    return [
      { code: 'c0', name: 'green' },
      { code: 'c1', name: 'Red' },
      { code: 'c2', name: 'Green' },
      { code: 'c3', name: 'Yellow' },
      { code: 'c4', name: 'White' }
    ]
  }
 
  GetCustomer(payload:any):Observable<any>{
    console.log("services:",payload)
    return this.http.get("http://localhost:3000/course/",{params:payload});
  }


search(key:any):Observable<any>{
  console.log(key)
  return this.http.get(`http://localhost:3000/course/`,{params:{title:key}})
}


  editdata(data:any){
    //localStorage.setItem('data','klfjdkfjdfjdkvdkjvbekjfhewjkhdsjkvndjvkbfvjkdfbvjkfdbvdfjkvb')
    return this.http.patch(`http://localhost:3000/course/updatecourse/${data.id}`,data);
  }

  deletecourse(data: any) {
    return this.http.delete(`http://localhost:3000/course/deletecourse/${data}`);
  }
  

  Savecustomer(data:any){
    return this.http.patch(`http://localhost:3000/course/updatecourse/${data.id}`,data);
  }
  addcourse(data:any){
    return this.http.post(`http://localhost:3000/course/addcourse/`,data);
  }


  GetCustomerbycode(code:any){
    return this.http.get(`http://localhost:3000/course/${code}`);
  }


  register(data:any){
    console.log(data)
    return this.http.post('http://localhost:3000/auth/signup/',data);

  }

  GetAssociate(){
    return this.http.get('http://localhost:3000/associate');
  }
  GetAssociatebycode(code:any){
    return this.http.get('http://localhost:3000/associate/'+code);
  }
  GetCountry():Observable<Country[]>{
    return this.http.get<Country[]>('http://localhost:3000/country');
  }

  SaveAssociate(data:any,code:any){
    return this.http.put('http://localhost:3000/associate/'+code,data);
  }

}
